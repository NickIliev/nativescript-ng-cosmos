const SETTINGS = require("../settings.json");

export function getApiKey() {
    return SETTINGS.nasaApiKey;
}
