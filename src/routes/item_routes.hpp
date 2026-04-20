#pragma once

#include <httplib.h>

#include "repos/item_repo.hpp"

class ItemRoutes
{
public:
    explicit ItemRoutes(ItemRepo& item_repo) : m_item_repo(item_repo) {
    }

    void add_item_to_collection(const httplib::Request& req, httplib::Response& res) {
        try {
            auto body = nlohmann::json::parse(req.body);
            
            std::cout << body.dump() << std::endl;

            int64_t collection_id = body.at("collection_id").get<int64_t>();

            m_item_repo.add_item(collection_id, Item(
                body.at("name").get<std::string>(),
                body.at("description").get<std::string>(),
                body.at("image_path").get<std::string>(),
                0
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

private:
    ItemRepo& m_item_repo;
};