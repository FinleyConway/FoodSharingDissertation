#include <httplib.h>

int main() {
    httplib::Server server;

    server.Get("/api", [](const httplib::Request&, httplib::Response& res) {
        res.set_content(R"({ "name": "finley" })", "application/json");
    });

    server.set_mount_point("/", "./public");
    server.listen("localhost", 8080);
}
