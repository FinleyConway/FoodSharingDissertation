#pragma once

#include <cstdint>

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/item.hpp"

class ItemRepo
{
public:
    explicit ItemRepo(SQLite::Database& db) : m_db(db) {
        m_db.exec(R"(
            CREATE TABLE item (
                id INTEGER PRIMARY KEY,
                collection_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                image_path TEXT NOT NULL,
                quantity INTEGER NOT NULL,

                FOREIGN KEY(collection_id) REFERENCES collection(id) ON DELETE CASCADE
            );
        )");
    }

    void add_item(int64_t collection_id, const Item& item) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO item (collection_id, name, description, image_path, quantity)
            VALUES(:id, :name, :description, :image_path, :quantity)
        )");

        query.bind("collection_id", collection_id);
        query.bind(":name", item.name);
        query.bind(":description", item.description);
        query.bind(":image_path", item.image_path);
        query.bind(":quantity", item.quantity);
        query.exec();
    }

private:
    SQLite::Database& m_db;
};