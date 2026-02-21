/**
 * parse the text component of a response to a JSON-object
 * @param {Response} response response object
 * @returns {JSON} JSON-object of the text component
 */
export default async function parse(response) {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        return { error: text };
    }
}
