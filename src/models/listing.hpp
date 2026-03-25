#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/Statement.h>
#include <SQLiteCpp/Column.h>

struct Listing
{
public:
    int64_t user_id = 0;
    std::string tag;
    std::string name;
    std::string description;
    int64_t time = 0;
    std::string image_path;

public:
    Listing() = default;

    explicit Listing(SQLite::Statement& query) {
        user_id = query.getColumn("user_id").getInt64();
        tag = query.getColumn("tag").getString();
        name = query.getColumn("name").getString();
        description = query.getColumn("description").getString();
        time = query.getColumn("time").getInt64();
        image_path = query.getColumn("image_path").getString();
    }
};

struct FoodListing 
{
public:
    std::string user_name;
    std::string user_meeting_instructions;
    std::string tag;
    std::string name;
    std::string description;
    int64_t time = 0;
    std::string image_path;
    int64_t quality_expires = 0;
    std::string quality_ingredients;
    std::string quality_rating;

public:
    FoodListing() = default;

    explicit FoodListing(SQLite::Statement& query) {
        user_name = query.getColumn("user_name").getString();
        user_meeting_instructions = query.getColumn("meeting_instructions").getString();
        tag = query.getColumn("tag").getString();
        name = query.getColumn("listing_name").getString();
        description = query.getColumn("description").getString();
        time = query.getColumn("time").getInt64();
        image_path = query.getColumn("image_path").getString();
        quality_expires = query.getColumn("expires").getInt64();
        quality_ingredients = query.getColumn("ingredients").getString();
        quality_rating = query.getColumn("rating").getString();
    }
};

struct AssistantListing
{
public:
    std::string user_name;
    std::string user_meeting_instructions;
    std::string tag;
    std::string name;
    std::string description;
    int64_t time = 0;
    std::string image_path;

public:
    AssistantListing() = default;

    explicit AssistantListing(SQLite::Statement& query) {
        user_name = query.getColumn("user_name").getString();
        user_meeting_instructions = query.getColumn("meeting_instructions").getString();
        tag = query.getColumn("tag").getString();
        name = query.getColumn("listing_name").getString();
        description = query.getColumn("description").getString();
        time = query.getColumn("time").getInt64();
        image_path = query.getColumn("image_path").getString();
    }
};