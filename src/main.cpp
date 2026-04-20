#include <optional>

#include <httplib.h>
#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

#include "models/collection.hpp"
#include "models/user.hpp"
#include "repos/collection_repo.hpp"
#include "repos/item_repo.hpp"
#include "repos/user_repo.hpp"
#include "repos/quality_repo.hpp"
#include "repos/listing_repo.hpp"
#include "routes/collection_routes.hpp"
#include "routes/listing_routes.hpp"

// could macro like TRY_LOG(x) if exceptions get too much
std::optional<SQLite::Database> create_db() {
    try {
        SQLite::Database db("db/test.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        db.exec("PRAGMA foreign_keys = ON;"); // enforces table relationships

        return db;
    }
    catch (const std::exception& e) {
        std::cout << e.what() << std::endl;

        return std::nullopt;
    }
}

void add_listing_examples(ListingRepo& listing_repo) {
    Listing l1{
        1,
        "Trade",
        "Chickpea Curry",
        "Homemade spicy chickpea curry with rice",
        1710000000,
        "https://picsum.photos/400/200?1"
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
        "https://picsum.photos/400/200?1"
    };

    Quality q2{
        1710004800,
        "Chicken, tortilla, lettuce, mayo",
        "Excellent"
    };

    listing_repo.add_food_listing(l1, q1);
    listing_repo.add_food_listing(l2, q2);

    Listing a1{
        1,
        "Wanted",
        "Chickpea Curry",
        "Homemade spicy chickpea curry with rice",
        1710000000,
        "https://picsum.photos/400/200?1"
    };

    Listing a2{
        1,
        "Wanted",
        "Chicken Wrap",
        "Grilled chicken wrap with salad and sauce",
        1710003000,
        "https://picsum.photos/400/200?1"
    };

    listing_repo.add_assistant_listing(a1);
    listing_repo.add_assistant_listing(a2);
}

int main() {
    auto database_opt = create_db();

    if (!database_opt.has_value()) {
        std::cout << "Database could not be created!" << std::endl;

        return -1;
    }

    auto& database = database_opt.value();

    UserRepo user_repo(database);
    user_repo.add_user(User("Prototype User", "Meet at the front door. Available between 5pm - 7pm."));
    user_repo.add_user(User("Fin", "Meet at the front door. Available between 5pm - 7pm."));
    user_repo.add_user(User("Polina", "Meet at the front door. Available between 5pm - 7pm."));
    user_repo.add_user(User("Brandon", "Meet at the front door. Available between 5pm - 7pm."));

    QualityRepo quality_repo(database);
    ListingRepo listing_repo(quality_repo, database);
    CollectionRepo collection_repo(database);
    ItemRepo item_repo(database);

    add_listing_examples(listing_repo);

    auto c1 = collection_repo.add_collection(1, Collection("Inventory", "Fridge", "My home fridge", ""));
    item_repo.add_item(c1, Item("Pasta", "Fusilli 500g", "https://picsum.photos/400/200?1", 3));

    auto c2 = collection_repo.add_collection(1, Collection("Meal", 
        "Pasta Bolognese", 
        "A classic Italian meat sauce served over pasta.", 
        "Brown the mince in a pan, drain excess fat. Add diced onion and garlic and cook for 5 mins. Stir in tinned tomatoes and simmer for 20 mins. Cook pasta separately and combine."
    ));
    item_repo.add_item(c2, Item("Pasta", "Fusilli 500g", "https://picsum.photos/400/200?1", 3));

    httplib::Server server;

    ListingRoutes listing_routes(listing_repo);
    CollectionRoutes collection_routes(collection_repo);

    server.Get("/api/food_listing/:limit/:offset", [&](const httplib::Request& req, httplib::Response& res) {
        listing_routes.get_all_food_listings(req, res);
    });

    server.Post("/api/food_listing/", [&](const httplib::Request& req, httplib::Response& res) {
        listing_routes.create_food_listing(req, res);
    });

    server.Get("/api/assistant_listing/:limit/:offset", [&](const httplib::Request& req, httplib::Response& res) {
        listing_routes.get_all_assistant_listings(req, res);
    });

    server.Post("/api/assistant_listing/", [&](const httplib::Request& req, httplib::Response& res) {
        listing_routes.create_assistant_listing(req, res);
    });

    server.Get("/api/collection/:user_id", [&](const httplib::Request& req, httplib::Response& res) {
        collection_routes.get_collections(req, res);
    });

    server.Post("/api/collection/", [&](const httplib::Request& req, httplib::Response& res) {
        collection_routes.create_collection(req, res);
    });

    server.set_mount_point("/", "./public");
    server.listen("0.0.0.0", 8080);
}
