#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

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
};

inline void to_json(nlohmann::json& j, const FoodListing& f) {
    j = {
        {"id", f.id},
        {"user_name", f.user_name},
        {"meeting_instructions", f.user_meeting_instructions},
        {"tag", f.tag},
        {"name", f.name},
        {"description", f.description},
        {"time", f.time},
        {"image_path", f.image_path},
        {"quality", {
            {"expires", f.quality_expires},
            {"ingredients", f.quality_ingredients},
            {"rating", f.quality_rating}
        }}
    };
}