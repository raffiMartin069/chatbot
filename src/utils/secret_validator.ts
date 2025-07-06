export class SecretValidator {
    static validate(apiKey: string, url: string): boolean {

        if (typeof apiKey !== 'string' || apiKey.trim() === '') {
            throw new Error("API key is not valid.");
        }

        if (typeof url !== 'string' || url.trim() === '') {
            throw new Error("URL is not valid.");
        }

        if (!apiKey || !url) {
            throw new Error("API key or URL is not set.");
        }

        return true;
    }
}
