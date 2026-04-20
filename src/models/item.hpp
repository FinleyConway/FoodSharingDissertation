#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

struct Item
{
public:
    int64_t id = 0;
    std::string name;
    std::string description;
    std::string image_path;
    int32_t quantity = 0;

public:
    Item() = default;

    Item(const std::string& name, const std::string& desc, const std::string& image_path, int32_t quanity) :
        name(name), description(desc), image_path(image_path), quantity(quanity) {
    }

    explicit Item(SQLite::Statement& query) {
        id = query.getColumn("item_id").getInt64();
        name = query.getColumn("item_name").getString();
        description = query.getColumn("item_description").getString();
        image_path = query.getColumn("image_path").getString();
        quantity = query.getColumn("quantity").getInt();
    }
};

// https://github.com/nlohmann/json#basic-usage
// feels weird but it works?
// seems to be the rec way??
inline void to_json(nlohmann::json& j, const Item& i) {
    j = {
        {"id", i.id},
        {"name", i.name},
        {"desc", i.description},
        {"image", i.image_path},
        {"quantity", i.quantity}
    };
}