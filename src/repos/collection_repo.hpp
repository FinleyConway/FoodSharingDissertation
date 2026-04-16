#pragma once

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/collection.hpp"
#include "models/item.hpp"

class CollectionRepo
{
public:
    explicit CollectionRepo(SQLite::Database& db) : m_db(db) { 
    }

    void create() {
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

    int64_t add_collection(const Collection& collection) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO collection (user_id, type, name, description, how_to_make)
            VALUES(:user_id, :type, :name, :description, :how_to_make)
        )");

        query.bind(":user_id", collection.user_id);
        query.bind(":type", collection.type);
        query.bind(":name", collection.name);
        query.bind(":description", collection.description);
        query.bind(":how_to_make", collection.how_to_make);
        query.exec();

        return m_db.getLastInsertRowid();
    }

    template<typename Fn>
    void get_all_items_from(int64_t user_id, int64_t collection_id, Fn&& fn) {
        SQLite::Statement query(m_db, R"(
            SELECT
                c.type,
                c.name AS collection_name,
                c.description AS collection_description,
                c.how_to_make,
                i.name AS item_name,
                i.description AS item_description,
                i.image_path,
                i.quantity
            FROM collection AS c
            INNER JOIN item AS i ON i.collection_id = c.id
            WHERE c.user_id = :user_id
            AND c.id = :collection_id
        )");

        query.bind(":user_id", user_id);
        query.bind(":collection_id", collection_id);

        while (query.executeStep()) {
            std::forward<Fn>(fn)(Item(query));
        }
    }

private:
    SQLite::Database& m_db;
};