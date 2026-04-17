export function createListing(listing_type, listing) {
    const response = fetch(`http://localhost:8080/api/${listing_type}/`, {
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return true;
    // should really add a error check
}