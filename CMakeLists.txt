cmake_minimum_required(VERSION 3.22...3.30)
project(food-sharing-server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_SCAN_FOR_MODULES OFF)

set(BINARY_FOLDER "webapp")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${BINARY_FOLDER}")

include(CTest)
enable_testing()

# main Program
add_executable(${PROJECT_NAME}
    src/main.cpp
)

# add submodules
add_subdirectory(vendor/SQLiteCpp)
add_subdirectory(vendor/json)
add_subdirectory(vendor/Catch2)
target_include_directories(${PROJECT_NAME} PRIVATE
    vendor/cpp-httplib
    ${PROJECT_SOURCE_DIR}/src/
)

target_link_libraries(${PROJECT_NAME} PRIVATE 
    SQLiteCpp
    nlohmann_json::nlohmann_json
)

# testing
add_executable(${PROJECT_NAME}-tests
    tests/listing.test.cpp
    tests/collection.test.cpp
)

target_link_libraries(${PROJECT_NAME}-tests PRIVATE
    Catch2::Catch2WithMain
    SQLiteCpp
    nlohmann_json::nlohmann_json
)

target_include_directories(${PROJECT_NAME}-tests PRIVATE
    vendor/cpp-httplib
    ${PROJECT_SOURCE_DIR}/src/
)

include(Catch)
catch_discover_tests(${PROJECT_NAME}-tests)

# copy web files to binary
add_custom_target(copy_public ALL
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_SOURCE_DIR}/public ${CMAKE_BINARY_DIR}/${BINARY_FOLDER}/public
    COMMAND ${CMAKE_COMMAND} -E copy_directory "${CMAKE_SOURCE_DIR}/db" "${CMAKE_BINARY_DIR}/${BINARY_FOLDER}/db"
)
add_dependencies(${PROJECT_NAME} copy_public)