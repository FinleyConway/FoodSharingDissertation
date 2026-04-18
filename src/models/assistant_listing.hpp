#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

struct AssistantListing
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

public:
    AssistantListing() = default;

    explicit AssistantListing(SQLite::Statement& query) {
        id = query.getColumn("id").getInt64();
        user_name = query.getColumn("user_name").getString();
        user_meeting_instructions = query.getColumn("meeting_instructions").getString();
        tag = query.getColumn("tag").getString();
        name = query.getColumn("listing_name").getString();
        description = query.getColumn("description").getString();
        time = query.getColumn("time").getInt64();
        image_path = query.getColumn("image_path").getString();
    }
};

inline void to_json(nlohmann::json& j, const AssistantListing& a) {
    j = {
        {"id", a.id},
        {"user_name", a.user_name},
        {"meeting_instructions", a.user_meeting_instructions},
        {"tag", a.tag},
        {"name", a.name},
        {"description", a.description},
        {"time", a.time},
        {"image_path", a.image_path},
        {"quality", {}}
    };
}