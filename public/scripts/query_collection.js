export async function getCollectionData(user_id) {
    const response = await fetch(`http://localhost:8080/api/collection/${user_id}`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
}