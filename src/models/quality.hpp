#pragma once

#include <cstdint>
#include <string>

struct Quality
{
public:
    int64_t expires = 0;
    std::string ingredients;
    std::string rating;

public:
    Quality() = default;

    Quality(int64_t expires, const std::string& ingredients, const std::string& rating) :
        expires(expires), ingredients(ingredients), rating(rating)
    {
    }
};