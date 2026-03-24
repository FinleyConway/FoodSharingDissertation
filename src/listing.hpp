#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>

struct Listing 
{
    int64_t user_id = 0;
    std::string tag;
    std::string name;
    std::string description;
    int64_t time = 0;
    std::string image_path;
};

class ListingRepo
{
public:
    explicit ListingRepo(SQLite::Database& db) : m_db(db) { }

    void create() {
        m_db.exec(R"(
            CREATE TABLE listing (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                tag TEXT NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                time INTEGER NOT NULL,
                image_path TEXT NOT NULL,

                FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
            );
        )");
    }

    int64_t add_listing(const Listing& listing) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO listing (user_id, tag, name, description, time, image_path)
            VALUES(:user_id, :tag, :name, :description, :time, :image_path)
        )");

        query.bind(":user_id", listing.user_id);
        query.bind(":tag", listing.tag);
        query.bind(":name", listing.name);
        query.bind(":description", listing.description);
        query.bind(":time", listing.time);
        query.bind(":image_path", listing.image_path);
        query.exec();

        return m_db.getLastInsertRowid();
    }

private:
    SQLite::Database& m_db;
};