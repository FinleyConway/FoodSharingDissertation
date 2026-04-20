#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

struct Item
{
public:
    std::string name;
    std::string description;
    std::string image_path;
    int32_t quantity = 0;

public:
    Item() = default;

    explicit Item(SQLite::Statement& query) {
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
        {"name", i.name},
        {"description", i.description},
        {"imagePath", i.image_path},
        {"quantity", i.quantity}
    };
}