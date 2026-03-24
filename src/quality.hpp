#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>

struct Quality
{
    int64_t listing_id = 0;
    int64_t expires = 0;
    std::string ingredients;
    std::string rating;
};

class QualityRepo
{
public:
    explicit QualityRepo(SQLite::Database& db) : m_db(db) { }

    void create() {
        m_db.exec(R"(
            CREATE TABLE quality (
                id INTEGER PRIMARY KEY,
                expires INTEGER NOT NULL,
                ingredients TEXT NOT NULL,
                rating TEXT NOT NULL,

                FOREIGN KEY(id) REFERENCES listing(id) ON DELETE CASCADE
            );
        )");
    }

    void add_quality(const Quality& quality) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO quality (id, expires, ingredients, rating)
            VALUES(:id, :expires, :ingredients, :rating)
        )");

        query.bind(":id", quality.listing_id);
        query.bind(":expires", quality.expires);
        query.bind(":ingredients", quality.ingredients);
        query.bind(":rating", quality.rating);
        query.exec();
    }

private:
    SQLite::Database& m_db;
};