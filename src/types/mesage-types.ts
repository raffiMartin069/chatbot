import { ROLE } from "../constants/roles";

export type MessageType = {
    role: typeof ROLE[keyof typeof ROLE];
    content: string;
    isLoading?: boolean;
}