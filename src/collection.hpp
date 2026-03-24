#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>

struct Collection
{
    int64_t user_id = 0;
    std::string type;
    std::string name;
    std::string description;
    std::string how_to_make;
};

class CollectionRepo
{
public:
    explicit CollectionRepo(SQLite::Database& db) : m_db(db) { }

    void create() {
        m_db.exec(R"(
            CREATE TABLE collection (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
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

private:
    SQLite::Database& m_db;
};