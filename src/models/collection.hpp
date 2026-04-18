#pragma once

#include <cstdint>
#include <string>
#include <vector>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

#include "models/item.hpp"

struct Collection
{   
public:
    int64_t id = 0;
    std::string type;
    std::string name;
    std::string description;
    std::string how_to_make;
    std::vector<Item> items;

public:
    Collection() = default;

    explicit Collection(SQLite::Statement& query) {
        id = query.getColumn("collection_id").getInt64();
        type = query.getColumn("type").getString();
        name = query.getColumn("collection_name").getString();
        description = query.getColumn("collection_description").getString();
        how_to_make = query.getColumn("how_to_make").getString();
    }
};

inline void to_json(nlohmann::json& j, const Collection& c) {
    j = {
        {"id", c.id},
        {"type", c.type},
        {"name", c.name},
        {"desc", c.description},
        {"howToMake", c.how_to_make},
        {"items", c.items}
    };
}