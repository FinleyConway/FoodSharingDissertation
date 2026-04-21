#include <catch2/catch_test_macros.hpp>
#include <vector>

#include "repos/collection_repo.hpp"
#include "repos/item_repo.hpp"
#include "repos/user_repo.hpp"
#include "models/collection.hpp"

static bool same_item(const Item& a, const Item& b) {
    return a.name == b.name &&
           a.description == b.description &&
           a.image_path == b.image_path &&
           a.quantity == b.quantity;
}

TEST_CASE("Collection repo operations", "[collection_repo]") {
    SQLite::Database db(":memory:", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
    db.exec("PRAGMA foreign_keys = ON;"); // enforces table relationships

    UserRepo user_repo(db);
    auto user_id = user_repo.add_user(User("test", "test"));

    ItemRepo item_repo(db);
    CollectionRepo collection_repo(db);

    Collection collection{
        "Inventory",
        "DnD Fridge",
        "For da boyzz",
        ""
    };

    Collection collection2{
        "Meal",
        "Pasta",
        "Not for da boyzz",
        ""
    };

    SECTION("Add and retrieve single collection with items") {
        auto collection_id = collection_repo.add_collection(user_id, collection);
        REQUIRE(collection_id > 0);  // make sure I got a valid row id

        Item items[3] = {
            Item("Bean", "Good beans", "...", 5),
            Item("Pork", "Good pork", "...", 5),
            Item("Chips", "Good chips", "...", 5)
        };

        item_repo.add_item(collection_id, items[0]);
        item_repo.add_item(collection_id, items[1]);
        item_repo.add_item(collection_id, items[2]);

        std::vector<Collection> collections;

        collection_repo.get_collection_with_items(user_id, [&](Collection c) {
            collections.emplace_back(c);
        });

        REQUIRE(collections.size() == 1); // make sure I get every row that is stored

        const auto& row_result = collections[0];

        REQUIRE(row_result.id == collection_id);
        REQUIRE(row_result.type == collection.type);
        REQUIRE(row_result.name == collection.name);
        REQUIRE(row_result.description == collection.description);
        REQUIRE(row_result.how_to_make == collection.how_to_make);

        // test items
        for (const auto& exp : items) {
            bool found = false;

            for (const auto& act : row_result.items) {
                if (same_item(exp, act)) {
                    found = true;
                    break;
                }
            }

            REQUIRE(found);
        }

        REQUIRE(row_result.items.size() == 3);
    }

    SECTION("Collection with no items") {
        collection_repo.add_collection(user_id, collection);

        std::vector<Collection> collections;

        collection_repo.get_collection_with_items(user_id, [&](Collection c) {
            collections.emplace_back(c);
        });

        REQUIRE(collections.size() == 1);
        REQUIRE(collections[0].items.empty());
    }

    SECTION("Only returns collections for specified user") {
        auto another_user = user_repo.add_user(User("other", "elsewhere"));

        collection_repo.add_collection(user_id, collection);
        collection_repo.add_collection(another_user, collection2);

        std::vector<Collection> results;

        collection_repo.get_collection_with_items(another_user, [&](Collection c) {
            results.emplace_back(c);
        });

        REQUIRE(results.size() == 1);
        REQUIRE(results[0].name == collection2.name);
    }
}