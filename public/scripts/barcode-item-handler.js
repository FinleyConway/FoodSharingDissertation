function parseBarcodeData(data) {
    if (data.status === 0) return null;

    const product = data.product;

    return {
        image_url: product.image_url ?? "",
        name: product.product_name ?? "",
        ingredients: product.ingredients_text ?? "",
        dietary: product.labels_tags ?? "",
        allergens: product.allergens_tags ?? "",
    }
}

// Third party API usage documented in README.md
export async function getBarcodeData(barcode) {
    const fields = [
        "product_name",
        "ingredients_text",
        "image_url",
        "labels_tags",
        "allergens_tags",
    ].join(",");

    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=${fields}`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return parseBarcodeData(await response.json());
}