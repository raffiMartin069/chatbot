import axios, { AxiosResponse } from "axios";

export const post = async (url: string, content: string): Promise<AxiosResponse<any> | void> => {

    if (!content) return;

    try {
        const res: AxiosResponse<any> = await axios.post(url, {
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

        return res;
    } catch (error) {
        console.error("Error posting message:", error);
    }
};
