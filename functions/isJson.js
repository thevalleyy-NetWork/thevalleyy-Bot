/**
 * Check if the item is a JSON object
 * @param {any} item Any data type
 * @returns {boolean} true if the item is a JSON object, false otherwise
 */
function isJson(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}
export default isJson;
