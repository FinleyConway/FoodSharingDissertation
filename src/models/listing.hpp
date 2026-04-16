#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

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

    Listing(int64_t user_id, std::string tag, std::string name, std::string description, int64_t time, std::string image_path): 
        user_id(user_id), tag(tag), name(name), description(description), time(time), image_path(image_path) {
    }

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
    int64_t id = 0;
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
        id = query.getColumn("id").getInt64();
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

    nlohmann::json to_json() const {
        return {
            {"id", id},
            {"user_name", user_name},
            {"meeting_instructions", user_meeting_instructions},
            {"tag", tag},
            {"name", name},
            {"description", description},
            {"time", time},
            {"image_path", image_path},
            {"quality", {
                {"expires", quality_expires},
                {"ingredients", quality_ingredients},
                {"rating", quality_rating}
            }}
        };
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