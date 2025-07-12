export type MessageType = {
    role: "client" | "assistant";
    content: string;
    isLoading?: boolean;
}