export function createCollection(collection) {
    const response = fetch(`http://localhost:8080/api/collection/`, {
        method: "POST",
        body: JSON.stringify(collection),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return true;
    // should really add a error check
}