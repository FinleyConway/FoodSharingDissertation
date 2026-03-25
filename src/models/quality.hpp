#pragma once

#include <cstdint>
#include <string>

struct Quality
{
    int64_t expires = 0;
    std::string ingredients;
    std::string rating;
};