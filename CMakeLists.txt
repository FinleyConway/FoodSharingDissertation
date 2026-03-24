cmake_minimum_required(VERSION 3.22...3.30)
project(food-sharing-server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_SCAN_FOR_MODULES OFF)

set(BINARY_FOLDER "webapp")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${BINARY_FOLDER}")

add_executable(${PROJECT_NAME}
    src/main.cpp
)

# add submodules
add_subdirectory(vendor/SQLiteCpp)
add_subdirectory(vendor/json)
target_include_directories(${PROJECT_NAME} PRIVATE
    vendor/cpp-httplib
)

target_link_libraries(${PROJECT_NAME} PRIVATE 
    SQLiteCpp
    nlohmann_json::nlohmann_json
)

# copy web files to binary
add_custom_target(copy_public ALL
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_SOURCE_DIR}/public ${CMAKE_BINARY_DIR}/${BINARY_FOLDER}/public
    COMMAND ${CMAKE_COMMAND} -E copy_directory "${CMAKE_SOURCE_DIR}/db" "${CMAKE_BINARY_DIR}/${BINARY_FOLDER}/db"
)
add_dependencies(${PROJECT_NAME} copy_public)