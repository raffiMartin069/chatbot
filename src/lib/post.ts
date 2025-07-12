import axios, { AxiosResponse } from "axios";

export const post = async <T = unknown>(url: string, content: string): Promise<T | undefined> => {
    if (!content) return;

    try {
        const res: AxiosResponse<T> = await axios.post(url, {
            data: content,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status !== 200) {
            console.error("Failed to post message:", res.statusText);
            return;
        }

        return res.data;
    } catch (error) {
        console.error("Error posting message:", error);
    }
};
