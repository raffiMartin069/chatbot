import ROLE from "@/constants/roles"

export type MessageType = {
    role: ROLE.CLIENT | ROLE.ASSISTANT;
    content: string;
    isLoading?: boolean;
}