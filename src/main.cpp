#include <print>
#include <optional>

#include <httplib.h>
#include <SQLiteCpp/SQLiteCpp.h>
#include <nlohmann/json.hpp>

// could macro like TRY_LOG(x) if exceptions get too much
std::optional<SQLite::Database> create_db() {
    try {
        SQLite::Database db("db/test.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        db.exec("PRAGMA foreign_keys = ON;"); // enforces table relationships

        return db;
    }
    catch (const std::exception& e) {
        std::println("exception: {}", e.what());

        return std::nullopt;
    }
}

int main() {

    // if (auto db = create_db()) {
    //     SQLite::Statement query = {
    //         *db,
    //         "SELECT id, value FROM test"
    //     };

    //     while (query.executeStep()) {
    //         int64_t id = query.getColumn(0).getInt64();
    //         std::string_view value = query.getColumn(1).getText();

    //         std::println("[ID: {}, Value: {}]", id, value);
    //     }
    // }

    // return 0;
    httplib::Server server;

    server.Get("/api", [](const httplib::Request&, httplib::Response& res) {
        res.set_content(R"({ "name": "finley" })", "application/json");
    });

    server.set_mount_point("/", "./public");
    server.listen("0.0.0.0", 8080);
}
