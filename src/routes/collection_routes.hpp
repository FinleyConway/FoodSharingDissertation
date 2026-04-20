#pragma once

#include <httplib.h>

#include "models/collection.hpp"
#include "repos/collection_repo.hpp"

class CollectionRoutes
{
public:
    explicit CollectionRoutes(CollectionRepo& collection_repo) : m_collection_repo(collection_repo) {
    }

    void create_collection(const httplib::Request& req, httplib::Response& res) {
        try {
            auto body = nlohmann::json::parse(req.body);
            
            int64_t user_id = body.at("user_id").get<int64_t>();

            m_collection_repo.add_collection(user_id, Collection(
                body.at("type").get<std::string>(),
                body.at("name").get<std::string>(),
                body.at("description").get<std::string>(),
                body.at("howToMake").get<std::string>()
            ));

            res.status = 201;
            res.set_content(R"({"status":"created"})", "application/json");
        }
        catch (const std::exception& e) {
            std::cout << e.what() << std::endl;
            res.status = 400;
            res.set_content(R"({"error":"invalid json"})", "application/json");
        }
    }

    void get_collections(const httplib::Request& req, httplib::Response& res) {
        try {
            auto user_id = std::stoul(req.path_params.at("user_id"));

            nlohmann::json json = nlohmann::json::array();

            m_collection_repo.get_collection_with_items(user_id, [&](const Collection& row) {
                json.emplace_back(row);
            });

            res.set_content(json.dump(), "application/json");
        } 
        catch (const std::exception& e) {
            std::cout << e.what() << std::endl;

            res.status = 400;
            res.set_content(R"({"error": "Invalid user_id"})", "application/json");
        }
    }

private:
    CollectionRepo& m_collection_repo;
};