#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>

struct Item
{
    int64_t collection_id = 0;
    std::string name;
    std::string description;
    std::string image_path;
    uint32_t quantity = 0;
};

class ItemRepo 
{
public:
    explicit ItemRepo(SQLite::Database& db) : m_db(db) { }

    void create() {
        m_db.exec(R"(
            CREATE TABLE item (
                id INTEGER PRIMARY KEY,
                collection_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                image_path TEXT NOT NULL,
                quantity INTEGER NOT NULL,

                FOREIGN KEY(collection_id) REFERENCES collection(id) ON DELETE CASCADE
            );
        )");
    }

    int64_t add_item(const Item& item) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO item (collection_id, name, description, image_path, quantity)
            VALUES(:collection_id, :name, :description, :image_path, :quantity)
        )");

        query.bind(":collection_id", item.collection_id);
        query.bind(":name", item.name);
        query.bind(":description", item.description);
        query.bind(":image_path", item.image_path);
        query.bind(":quantity", item.quantity);
        query.exec();

        return m_db.getLastInsertRowid();
    }

private:
    SQLite::Database& m_db;
};