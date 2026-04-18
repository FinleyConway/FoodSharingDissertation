#pragma once

#include <cstdint>

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/user.hpp"

class UserRepo
{
public:
    explicit UserRepo(SQLite::Database& db) : m_db(db) {
        m_db.exec(R"(
            CREATE TABLE user (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                meeting_instructions TEXT NOT NULL
            );
        )");
    }

    int64_t add_user(const User& user) {
        SQLite::Statement query(m_db, R"(
            INSERT INTO user (name, meeting_instructions)
            VALUES(:name, :meeting_instructions)
        )");

        query.bind(":name", user.name);
        query.bind(":meeting_instructions", user.meeting_instructions);
        query.exec();

        return m_db.getLastInsertRowid();
    }

private:
    SQLite::Database& m_db;
};