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