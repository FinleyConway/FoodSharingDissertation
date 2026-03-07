#include <print>
#include <optional>
#include <string_view>

#include <httplib.h>
#include <SQLiteCpp/SQLiteCpp.h>

// could macro like TRY_LOG(x) if exceptions get too much
std::optional<SQLite::Database> create_db() {
    try {
        SQLite::Database db("db/test.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        SQLite::Transaction transaction(db);

        db.exec(
            "CREATE TABLE IF NOT EXISTS test ("
            "   id INTEGER PRIMARY KEY AUTOINCREMENT," 
            "   value TEXT NOT NULL"
            ")"
        );

        SQLite::Statement query = {
            db,
            "INSERT INTO test (value) VALUES (?)"
        };

        for (uint8_t i = 0; i < 5; i++) {
            query.bind(1, i);
            query.exec();
            query.reset();
        }

        transaction.commit();

        return db;
    }
    catch (const std::exception& e) {
        std::println("exception: {}", e.what());

        return std::nullopt;
    }
}

int main() {

    if (auto db = create_db()) {
        SQLite::Statement query = {
            *db,
            "SELECT id, value FROM test"
        };

        while (query.executeStep()) {
            int64_t id = query.getColumn(0).getInt64();
            std::string_view value = query.getColumn(1).getText();

            std::println("[ID: {}, Value: {}]", id, value);
        }
    }

    return 0;
    httplib::Server server;

    server.Get("/api", [](const httplib::Request&, httplib::Response& res) {
        res.set_content(R"({ "name": "finley" })", "application/json");
    });

    server.set_mount_point("/", "./public");
    server.listen("localhost", 8080);
}
