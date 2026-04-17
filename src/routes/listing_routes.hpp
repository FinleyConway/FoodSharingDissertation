#pragma once

#include <chrono>

#include <httplib.h>

#include "models/listing.hpp"
#include "models/quality.hpp"
#include "repos/listing_repo.hpp"

class ListingRoutes
{
public:
    explicit ListingRoutes(ListingRepo& listing_repo) : m_listing_repo(listing_repo) {
    }

public:
    void create_food_listing(const httplib::Request& req, httplib::Response& res) {
        try {
            auto body = nlohmann::json::parse(req.body);
            std::cout << body.dump() << std::endl;
            int64_t publish_time = std::chrono::duration_cast<std::chrono::seconds>(
                std::chrono::system_clock::now().time_since_epoch()
            ).count();

            Listing listing(
                body.at("user_id").get<int64_t>(),
                body.at("tag").get<std::string>(),
                body.at("name").get<std::string>(),
                body.at("description").get<std::string>(),
                publish_time,
                body.at("image_path").get<std::string>()
            );

            Quality quality(
                body["context"].at("expiry").get<int64_t>(),
                body["context"].at("ingredients").get<std::string>(),
                body["context"].at("rating").get<std::string>()
            );

            m_listing_repo.add_food_listing(listing, quality);

            res.status = 201;
            res.set_content(R"({"status":"created"})", "application/json");
        }
        catch (const std::exception& e) {
            std::cout << e.what() << std::endl;
            res.status = 400;
            res.set_content(R"({"error":"invalid json"})", "application/json");
        }
    }

    void create_assistant_listing(const httplib::Request& req, httplib::Response& res) {
        try {
            auto body = nlohmann::json::parse(req.body);

            int64_t publish_time = std::chrono::duration_cast<std::chrono::seconds>(
                std::chrono::system_clock::now().time_since_epoch()
            ).count();

            Listing listing(
                body.at("user_id").get<int64_t>(),
                body.at("tag").get<std::string>(),
                body.at("name").get<std::string>(),
                body.at("description").get<std::string>(),
                publish_time,
                body.at("image_path").get<std::string>()
            );

            m_listing_repo.add_assistant_listing(listing);

            res.status = 201;
            res.set_content(R"({"status":"created"})", "application/json");
        }
        catch (const std::exception& e) {
            std::cout << e.what() << std::endl;
            res.status = 400;
            res.set_content(R"({"error":"invalid json"})", "application/json");
        }
    }

    void get_all_food_listings(const httplib::Request& req, httplib::Response& res) {
        try {
            auto listing_limit = std::stoul(req.path_params.at("limit"));
            auto listing_offset = std::stoul(req.path_params.at("offset"));

            nlohmann::json json = nlohmann::json::array();

            m_listing_repo.get_all_food_listings(listing_limit, listing_offset, [&](FoodListing row) {
                json.emplace_back(row.to_json());
            });

            res.set_content(json.dump(), "application/json");
        } 
        catch (const std::exception& e) {
            res.status = 400;
            res.set_content(R"({"error": "Invalid limit or offset"})", "application/json");
        }
    }

    void get_all_assistant_listings(const httplib::Request& req, httplib::Response& res) {
        try {
            auto listing_limit = std::stoul(req.path_params.at("limit"));
            auto listing_offset = std::stoul(req.path_params.at("offset"));

            nlohmann::json json = nlohmann::json::array();

            m_listing_repo.get_all_assistant_listings(listing_limit, listing_offset, [&](AssistantListing row) {
                json.emplace_back(row.to_json());
            });

            res.set_content(json.dump(), "application/json");
        } 
        catch (const std::exception& e) {
            std::cout << e.what() << std::endl;

            res.status = 400;
            res.set_content(R"({"error": "Invalid limit or offset"})", "application/json");
        }
    }

private:
    ListingRepo& m_listing_repo;
};