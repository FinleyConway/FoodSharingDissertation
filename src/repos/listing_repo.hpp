#pragma once

#include <cstdint>

#include <SQLiteCpp/SQLiteCpp.h>

#include "models/listing.hpp"
#include "repos/quality_repo.hpp"

class ListingRepo
{
public:
    explicit ListingRepo(QualityRepo& quality_repo, SQLite::Database& db) : 
        m_db(db), m_quality_repo(quality_repo) { 
    }

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

    template<typename Fn>
    void get_all_food_listings(uint32_t listing_limit, uint32_t offset, Fn&& fn) {
        SQLite::Statement query(m_db, R"(
            SELECT 
                l.id, 
                u.name AS user_name, 
                u.meeting_instructions, 
                l.tag, 
                l.name AS listing_name, 
                l.description, 
                l.time, 
                l.image_path,
                q.expires,
                q.ingredients,
                q.rating
            FROM listing AS l
            INNER JOIN user AS u ON u.id = l.user_id
            INNER JOIN quality AS q ON q.id = l.id
            LIMIT :limit OFFSET :offset 
        )");
        
        query.bind(":limit", listing_limit);
        query.bind(":offset", offset);

        while (query.executeStep()) {
            std::forward<Fn>(fn)(FoodListing(query));
        }
    }

    template<typename Fn>
    void get_all_assistant_listings(uint32_t listing_limit, uint32_t offset, Fn&& fn) {
        SQLite::Statement query(m_db, R"(
            SELECT 
                l.id, 
                u.name AS user_name, 
                u.meeting_instructions, 
                l.tag, 
                l.name AS listing_name, 
                l.description, 
                l.time, 
                l.image_path
            FROM listing AS l
            INNER JOIN user AS u ON u.id = l.user_id
            WHERE l.tag = "Wanted"
            LIMIT :limit OFFSET :offset 
        )");
        
        query.bind(":limit", listing_limit);
        query.bind(":offset", offset);

        while (query.executeStep()) {
            std::forward<Fn>(fn)(AssistantListing(query));
        }
    }

    int64_t add_food_listing(const Listing& listing, const Quality& quality) {
        SQLite::Transaction t(m_db);

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

        int64_t listing_id = m_db.getLastInsertRowid();

        m_quality_repo.add_quality(listing_id, quality);

        t.commit();

        return listing_id;
    }

    int64_t add_assistant_listing(const Listing& listing) {
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
    QualityRepo& m_quality_repo;
};