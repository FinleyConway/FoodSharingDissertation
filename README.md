# FoodSharing Dissertation

A student food sharing web app prototype for my dissertation project using C++ with HTML, CSS and JavaScript.

## Building
1. Install Git and CMake.
2. Clone this repository: `git clone --recurse-submodules https://github.com/FinleyConway/FoodSharingDissertation.git`.
3. Using CMake from the command line; making sure you are in the root directory of the project, use the following commands:
```bash
cmake -B build
cmake --build build
```

## Running
1. Navigate to `build/webapp` within the root directory of the project.
2. Run `food-sharing-server` executable.
3. Go to `http://localhost:8080` in your browser.

> [!NOTE]
> To access the web app from another device (e.g. mobile phone), use the **local IP address** of the device running the server.
> 
> For example, instead of:
> `http://localhost:8080`
> 
> use:
> `http://192.168.x.x:8080`

## External Libraries and APIs
- [cpp-httplib](https://github.com/yhirose/cpp-httplib) is under the [MIT license](https://github.com/yhirose/cpp-httplib/blob/master/LICENSE).
- [SQLiteCpp](https://github.com/SRombauts/SQLiteCpp) is under the [MIT license](https://github.com/SRombauts/SQLiteCpp/blob/master/LICENSE.txt).
- [Open Food Facts API](https://world.openfoodfacts.org/api) is under the [Open Database License (ODbL)](https://world.openfoodfacts.org/terms-of-use).
- [Picsum Photos](https://picsum.photos) is under the [MIT license](https://github.com/DMarby/picsum-photos/blob/main/LICENSE.md).
