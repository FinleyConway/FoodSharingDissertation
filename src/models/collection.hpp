#pragma once

#include <cstdint>
#include <string>

struct Collection
{   
    int64_t id = 0;
    int64_t user_id = 0;
    std::string type;
    std::string name;
    std::string description;
    std::string how_to_make;
};