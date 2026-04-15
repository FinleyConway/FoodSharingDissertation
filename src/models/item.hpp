#pragma once

#include <cstdint>
#include <string>

#include <SQLiteCpp/SQLiteCpp.h>

struct Item
{
public:
    int64_t collection_id = 0;
    std::string name;
    std::string description;
    std::string image_path;
    int32_t quantity = 0;

public:
    Item() = default;

    explicit Item(SQLite::Statement& query) {
        collection_id = query.getColumn("collection_id").getInt64();
        name = query.getColumn("name").getString();
        description = query.getColumn("description").getString();
        image_path = query.getColumn("image_path").getString();
        quantity = query.getColumn("quantity").getInt();
    }
};