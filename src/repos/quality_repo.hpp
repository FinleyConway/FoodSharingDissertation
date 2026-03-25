#pragma once

#include <cstdint>

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/quality.hpp"

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

    void add_quality(int64_t listing_id, const Quality& quality) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO quality (id, expires, ingredients, rating)
            VALUES(:id, :expires, :ingredients, :rating)
        )");

        query.bind(":id", listing_id);
        query.bind(":expires", quality.expires);
        query.bind(":ingredients", quality.ingredients);
        query.bind(":rating", quality.rating);
        query.exec();
    }

private:
    SQLite::Database& m_db;
};