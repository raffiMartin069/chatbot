"use client";
import React from 'react'

import { MessageType } from '@/types/mesage-types';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { ROLE } from '../constants/roles';
import Loader from '@/components/loader';

function ChatPane({ convo }: { convo: MessageType[] }) {

    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [convo.length]);

    return (
        <>
            {
                convo.length === 0 ? (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-500'>Start a conversation by asking a question.</p>
                    </div>
                ) : (
                    <ScrollArea className='h-full overflow-y-auto' ref={scrollRef}>
                        {convo.map((message, idx) => {
                            const isClient = message.role === ROLE.CLIENT;
                            const isLoading = message.isLoading;
                            return (
                                <div key={idx} className={`border rounded-xl p-5 m-2 ${isClient ? "border-slate-100 bg-slate-50 flex justify-end" : "border-sky-100 bg-sky-50"}`}>
                                    {isLoading ? (<Loader />) : (<div className='whitespace-pre-wrap break-words overflow-x-hidden'>
                                        {message.content}
                                    </div>)}
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