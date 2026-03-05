cmake_minimum_required(VERSION 3.22...3.30)
project(cpp_webapp_test LANGUAGES CXX)

set(BINARY_FOLDER "webapp")

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/${BINARY_FOLDER})

add_executable(cpp_webapp_test
    src/main.cpp
)

target_include_directories(cpp_webapp_test PRIVATE
    ${CMAKE_SOURCE_DIR}/vendor/cpp-httplib
)

# copy web files to binary
add_custom_target(copy_public ALL
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_SOURCE_DIR}/public ${CMAKE_BINARY_DIR}/${BINARY_FOLDER}/public
)