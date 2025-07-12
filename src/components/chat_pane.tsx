"use client";
import React from 'react'

import { MessageType } from '@/types/mesage-types.';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import ROLE from '@/constants/roles';
import Loader from '@/components/loader';
import ReactMarkdown from 'react-markdown';

export function formatMarkdown(raw: string): string {
    return raw
        .replace(/(\d+\.)/g, '\n\n$1')   // Force new paragraph before numbered steps
        .replace(/(?<!\n)- /g, '\n- ')   // Ensure bullet items are on their own lines
        .replace(/\n{3,}/g, '\n\n')      // Collapse too many line breaks
        .trim();
}



function ChatPane({ convo }: { convo: MessageType[] }) {

    return (
        <>
            {
                convo.length === 0 ? (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-500'>Start a conversation by asking a question.</p>
                    </div>

                ) : (
                    <ScrollArea className='h-full overflow-y-auto'>
                        {convo.map((message, idx) => {
                            const isClient = message.role === ROLE.CLIENT;
                            const isLoading = (message as any).isLoading;
                            return (
                                <div key={idx} className={`border rounded-xl p-5 m-2 ${isClient ? "border-slate-100 bg-slate-50 flex justify-end" : "border-sky-100 bg-sky-50"}`}>
                                    {isLoading ? (<Loader />) : (<pre className='whitespace-pre-wrap break-words overflow-x-hidden'>
                                        {message.content}
                                    </pre>)}
                                </div>
                            );
                        })}

                    </ScrollArea>
                )
            }
        </>
    )
}

export default ChatPane