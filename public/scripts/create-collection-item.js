export function createCollectionItem(item) {
    const response = fetch(`http://localhost:8080/api/item/`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return true;
    // should really add a error check
}