import axios from 'axios';

export const post = async (
    data: string | string[] | object,
    url: string,
    apiKey: string
): Promise<any> => {
    try {
        const response = await axios.post(
            url,
            { query: data },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('POST request failed:', error);
        throw error; // Re-throw so calling code can handle it if needed
    }
};
