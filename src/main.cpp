#include <print>
#include <optional>

#include <httplib.h>
#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

#include "models/user.hpp"
#include "repos/user_repo.hpp"
#include "repos/quality_repo.hpp"
#include "repos/listing_repo.hpp"

// could macro like TRY_LOG(x) if exceptions get too much
std::optional<SQLite::Database> create_db() {
    try {
        SQLite::Database db("db/test.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        db.exec("PRAGMA foreign_keys = ON;"); // enforces table relationships

        return db;
    }
    catch (const std::exception& e) {
        std::println("exception: {}", e.what());

        return std::nullopt;
    }
}

int main() {
    auto database_opt = create_db();

    if (!database_opt.has_value()) {
        std::println("Database could not be created!");

        return -1;
    }

    auto& database = database_opt.value();

    UserRepo user_repo(database);
    QualityRepo quality_repo(database);
    ListingRepo listing_repo(quality_repo, database);

    user_repo.create();
    quality_repo.create();
    listing_repo.create();

    user_repo.add_user(User("Fin", "Meet at the front door. Available between 5pm - 7pm."));

    Listing l1{
        1,
        "Trade",
        "Chickpea Curry",
        "Homemade spicy chickpea curry with rice",
        1710000000,
        "/images/curry.jpg"
    };

    Quality q1{
        1710003600,
        "Chickpeas, tomatoes, garlic, spices",
        "Good"
    };

    Listing l2{
        1,
        "Free",
        "Chicken Wrap",
        "Grilled chicken wrap with salad and sauce",
        1710003000,
        "/images/wrap.jpg"
    };

    Quality q2{
        1710004800,
        "Chicken, tortilla, lettuce, mayo",
        "Excellent"
    };

    listing_repo.add_food_listing(l1, q1);
    listing_repo.add_food_listing(l2, q2);

    httplib::Server server;

    server.Get("/api/food_listing/:limit/:offset", [&](const httplib::Request& req, httplib::Response& res) {
        try {
            auto listing_limit = std::stoul(req.path_params.at("limit"));
            auto listing_offset = std::stoul(req.path_params.at("offset"));

            nlohmann::json json;

            listing_repo.get_all_food_listings(listing_limit, listing_offset, [&](FoodListing row) {
                json.emplace_back(row.to_json());
            });

            res.set_content(json.dump(), "application/json");
        } 
        catch (const std::exception& e) {
            res.status = 400;
            res.set_content(R"({"error": "Invalid limit or offset"})", "application/json");
        }
    });

    server.set_mount_point("/", "./public");
    server.listen("0.0.0.0", 8080);
}
