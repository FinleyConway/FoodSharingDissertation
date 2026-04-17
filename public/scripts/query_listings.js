export async function getListingData(listing_type, limit, offset) {
    const response = await fetch(`http://localhost:8080/api/${listing_type}/${limit}/${offset}`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
}