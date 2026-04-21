#include <catch2/catch_test_macros.hpp>

#include "models/assistant_listing.hpp"
#include "models/food_listing.hpp"
#include "repos/listing_repo.hpp"
#include "repos/quality_repo.hpp"
#include "repos/user_repo.hpp"

TEST_CASE("Listing repo operations", "[listing_repo]") {
    SQLite::Database db(":memory:", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
    db.exec("PRAGMA foreign_keys = ON;"); // enforces table relationships

    UserRepo user_repo(db);
    user_repo.add_user(User("test", "test"));

    QualityRepo quality_repo(db);
    ListingRepo listing_repo(quality_repo, db);

    Listing listing_food{
        1,
        "Trade",
        "Chickpea Curry",
        "Homemade spicy chickpea curry with rice",
        1710000000,
        "https://picsum.photos/400/200?1"
    };

    Listing listing_ass{
        1,
        "Wanted",
        "Chickpea Curry",
        "Homemade spicy chickpea curry with rice",
        1710000000,
        "https://picsum.photos/400/200?1"
    };


    Quality quality{
        1710003600,
        "Chickpeas, tomatoes, garlic, spices",
        "Good"
    };

    SECTION("Add and retrieve food listing") {
        auto id = listing_repo.add_food_listing(listing_food, quality);
        REQUIRE(id > 0); // make sure I got a valid row id

        std::vector<FoodListing> listings;

        listing_repo.get_all_food_listings(10, 0, [&](FoodListing row) {
            listings.emplace_back(row);
        });

        REQUIRE(listings.size() == 1); // make sure I get every row that is stored

        const auto& row_result = listings[0];

        // make sure that the correct contensts are actually being stored and retrieved properly
        REQUIRE(row_result.id == id);
        REQUIRE(row_result.user_name == "test");
        REQUIRE(row_result.user_meeting_instructions == "test");
        REQUIRE(row_result.tag == listing_food.tag);
        REQUIRE(row_result.name == listing_food.name);
        REQUIRE(row_result.description == listing_food.description);
        REQUIRE(row_result.time == listing_food.time);
        REQUIRE(row_result.image_path == listing_food.image_path);
        REQUIRE(row_result.quality_expires == quality.expires);
        REQUIRE(row_result.quality_ingredients == quality.ingredients);
        REQUIRE(row_result.quality_rating == quality.rating);
    }

    SECTION("Add and retrieve assistant listing") {
        auto id = listing_repo.add_assistant_listing(listing_ass);
        REQUIRE(id > 0); // make sure I got a valid row id

        std::vector<AssistantListing> listings;

        listing_repo.get_all_assistant_listings(10, 0, [&](AssistantListing row) {
            listings.emplace_back(row);
        });

        REQUIRE(listings.size() == 1); // make sure I get every row that is stored

        const auto& row_result = listings[0];

        // make sure that the correct contensts are actually being stored and retrieved properly
        REQUIRE(row_result.id == id);
        REQUIRE(row_result.user_name == "test");
        REQUIRE(row_result.user_meeting_instructions == "test");
        REQUIRE(row_result.tag == listing_ass.tag);
        REQUIRE(row_result.name == listing_ass.name);
        REQUIRE(row_result.description == listing_ass.description);
        REQUIRE(row_result.time == listing_ass.time);
        REQUIRE(row_result.image_path == listing_ass.image_path);
    }
}