"use client";
import React, { FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp } from "lucide-react";

type Conversation = {
    query: string;
    role: string;
    response?: string;
}

export default function Chat() {

    const [question, setQuestion] = React.useState("");
    const [conversation, setConversation] = React.useState<Conversation[]>([]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("question", question);
        if (!question.trim() || question === "") {
            return;
        }
        const userMessage: Conversation = {
            query: question,
            role: "user",
        };

        setConversation(prev => [...prev, userMessage]);
        setQuestion("");

        try {
            const url = "api/messages";

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: question,
                }),
            })
            const data = await res.json();
            if (!res.ok) {
                conversation.push({
                    query: question,
                    role: 'assistant',
                    response: "Sorry, I am unable to answer that question at the moment. Please try again later."
                });
            }
            setConversation(prev => [...prev, {
                query: question,
                role: 'assistant',
                response: data.response
            }]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col lg:px-32 xl:px-64 2xl:container 2xl:mx-auto 2xl:px-72">
                {
                    conversation.length < 1 ? (
                        <div className="flex-1 border border-white flex flex-col justify-center items-center text-center">
                            <h1 className="text-3xl text-center mt-10">Hello Kabayan Let&apos;s Chat!</h1>
                        </div>

                    ) : (
                        <ScrollArea className="flex-1 border border-white flex flex-col justify-center">
                            {
                                conversation.map((message, index) => (
                                    message.role === 'user' ? (
                                        <div key={index} className="w-full flex  justify-end  p-4 border-b border-gray-200">
                                            <div className="w-fit size-fit p-5 rounded-2xl self-end bg-gray-50">
                                                <p className="text-gray-800 whitespace-pre-wrap break-words break-all">{message.query}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="w-full flex p-4">
                                            <p className="text-gray-800">{message.response}</p>
                                        </div>
                                    )
                                ))
                            }
                        </ScrollArea>
                    )
                }
                <div className="w-full sticky bottom-0 p-4 bg-white border border-white flex justify-center items-center gap-3">
                    <Textarea className='h-32' placeholder="Ask me anything!" value={question} onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as unknown as FormEvent); // TypeScript workaround for synthetic event
                        }
                    }} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)} />
                    <div className="flex justify-end mt-2">
                        <Button className="rounded-full hover:shadow-sm" type="submit">
                            <ArrowUp />
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}