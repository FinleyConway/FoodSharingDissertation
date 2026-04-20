#pragma once

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/collection.hpp"

class CollectionRepo
{
public:
    explicit CollectionRepo(SQLite::Database& db) : m_db(db) { 
        m_db.exec(R"(
            CREATE TABLE collection (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                how_to_make TEXT,

                FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
            );
        )");
    }

    int64_t add_collection(int64_t user_id, const Collection& collection) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO collection (user_id, type, name, description, how_to_make)
            VALUES(:user_id, :type, :name, :description, :how_to_make)
        )");

        query.bind(":user_id", user_id);
        query.bind(":type", collection.type);
        query.bind(":name", collection.name);
        query.bind(":description", collection.description);
        query.bind(":how_to_make", collection.how_to_make);
        query.exec();

        return m_db.getLastInsertRowid();
    }

    template<typename Fn>
    void get_collection_with_items(int64_t user_id, Fn&& fn) {
        // i hate this approach...
        SQLite::Statement query(m_db, R"(
            SELECT
                c.id AS collection_id,
                c.type,
                c.name AS collection_name,
                c.description AS collection_description,
                c.how_to_make,
                i.id AS item_id,
                i.name AS item_name,
                i.description AS item_description,
                i.image_path,
                i.quantity
            FROM collection AS c
            LEFT JOIN item AS i ON i.collection_id = c.id
            WHERE c.user_id = :user_id
            ORDER BY c.id
        )");

        query.bind(":user_id", user_id);
        
        Collection collection;
        int64_t current_id = -1;

        while (query.executeStep()) {
            int64_t collection_id = query.getColumn("collection_id").getInt64();

            // bit wacky here...
            // checks if it has found a new collection
            if (current_id != collection_id) {
                // push the previous one as its done
                if (current_id != -1) {
                    std::forward<Fn>(fn)(collection);
                }

                // create a new collection
                collection = Collection(query);
                current_id = collection_id;
            }

            // add item to current collection
            if (!query.getColumn("item_id").isNull()) {
                collection.items.emplace_back(query);
            }
        }

        if (current_id != -1) {
            std::forward<Fn>(fn)(collection);
        }
    }

private:
    SQLite::Database& m_db;
};