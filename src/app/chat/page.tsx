"use client"
import React, { useState, useEffect } from 'react'
import { ArrowUp } from "lucide-react";
import { Button } from '../../components/ui/button.tsx';
import { Textarea } from '../../components/ui/textarea.tsx';
import axios from 'axios';
import { ScrollArea } from '../../components/ui/scroll-area.tsx';

type Message = {
    question: string;
    answer: string;
    role: "user" | "assistant";
}

function Page() {

    const [stack, setStack] = React.useState<Message[]>([]);
    const [question, setQuestion] = React.useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState(0);
    const loadingMessages = React.useMemo(() => [
        "Kabayan is currently thinking...",
        "Calculating probabilities...",
        "Gathering relevant information from the depths of the universe...",
        "Using ultra super instinct...",
    ], []);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setLoadingIndex(prev => (prev + 1) % loadingMessages.length);

            setStack(prev => {
                const updated = [...prev];
                const lastMessage = updated[updated.length - 1];

                if (lastMessage?.role === "assistant" && lastMessage.answer.includes("...")) {
                    updated[updated.length - 1] = {
                        ...lastMessage,
                        answer: loadingMessages[(loadingIndex + 1) % loadingMessages.length]
                    };
                }

                return updated;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading, loadingIndex, loadingMessages]);



    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = question.trim();

        if (!trimmed) return;

        setStack((prev) => [
            ...prev,
            {
                question: trimmed,
                answer: "Thinking...",
                role: "user"
            }
        ])

        setQuestion("");
        const randomText = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setIsLoading(true);
        setLoadingIndex(0);

        setStack(prev => [
            ...prev,
            { role: 'assistant', question: '', answer: randomText }
        ]);

        let res;

        try {
            res = await axios.post('/api/messages', {
            query: trimmed
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        } catch (error) {
            console.error("Error sending message:", error);
            setIsLoading(false);
            setStack((prev) => [
                ...prev,
                {
                    question: trimmed,
                    answer: "Sorry, I am unable to answer that question at the moment. Please try again later.",
                    role: "assistant"
                }
            ]);
            return;
        }


        if (res.status != 200) {
            setStack((prev) => [
                ...prev,
                {
                    question: trimmed,
                    answer: "Sorry, I am unable to answer that question at the moment. Please try again later.",
                    role: "assistant"
                }
            ]);
            return;
        }

        if (!res.data.response) {
            setStack((prev) => [
                ...prev,
                {
                    question: trimmed,
                    answer: "Sorry, I am unable to answer that question at the moment. Please try again later.",
                    role: "assistant"
                }
            ]);
            return;
        }

        // Replace the last loading message with the real answer
        setStack(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
                question: trimmed,
                answer: res.data.response,
                role: "assistant"
            };
            return updated;
        });
    }


    return (
        <div className="w-full h-screen flex flex-col md:mx-12 lg:mx-52 xl:px-32 2xl:px-72">

            {
                stack.length < 1 ? (
                    <section className="flex-1 overflow-auto">
                        <div className=" flex flex-col items-center justify-center h-full">
                            <div>
                                <h1 className="text-3xl">Hello! I&apos;m Kabayan!</h1>
                                <small>by: Raffa</small>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="flex-1 overflow-auto">
                        <ScrollArea>
                            {
                                stack.map((message, index) => (
                                    message.role === 'user' ? (
                                        <div key={index} className="w-full flex  justify-end  p-4 border-b border-gray-200">
                                            <div className="w-fit size-fit p-5 rounded-2xl self-end bg-gray-50">
                                                <p className="text-gray-800 whitespace-pre-wrap break-words break-all">{message.question}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="w-full flex p-4">
                                            <p className="text-gray-800">{message.answer}</p>
                                        </div>
                                    )
                                ))
                            }
                        </ScrollArea>
                    </section>
                )
            }
            <section>
                <form action="post" onSubmit={submitHandler}>
                    <div className="relative w-full  p-2">
                        <Textarea
                            placeholder="Type your message here..."
                            className="w-full h-24 pr-12 resize-none"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Button
                            className="absolute bottom-8 right-4 h-10 w-10 bg-black text-white hover:text-black hover:bg-gray-50 hover:border hover:border-black rounded-full"
                            type="submit"

                        >
                            <ArrowUp size={16} className='' />
                        </Button>
                    </div>
                </form>
            </section>
            <footer>
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">© 2025 Kabayan. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}


export default Page