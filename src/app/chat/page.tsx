"use client";
import React, { useEffect, useOptimistic, useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { MessageType } from '@/types/mesage-types.';
import { post } from '@/lib/post';
import { AxiosResponse } from 'axios';
import ROLE from '@/constants/roles';

function Page() {

  const [convo, setConvo] = useState<MessageType[]>([]);
  const [content, setContent] = useState<string>("");

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    setConvo((prev) => [
      ...prev,
      {
        role: ROLE.CLIENT,
        content: content
      }
    ])

    const assistantMessage: AxiosResponse = await post(content);

    console.log(assistantMessage);

    setConvo((prev) => [
      ...prev,
      {
        role: ROLE.ASSISTANT,
        content: assistantMessage.data.response || "Sorry, I couldn't process your request."
      }
    ])
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="p-2 flex-1 w-full h-screen">
        <div className='grid grid-cols-1 grid-rows-[1fr_auto] h-screen'>
          <div className='flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-hidden'>
              {
                <ScrollArea className='h-full overflow-y-auto'>
                  {
                    convo.length > 0 ? (
                      <>
                        {convo.map((message, idx) =>
                          message.role === ROLE.CLIENT ? (
                            <div key={idx} className='border border-slate-100 rounded-xl bg-slate-50 p-5 m-2 items-center justify-start flex'>
                              <p>{message.content}</p>
                            </div>
                          ) : (
                            <div key={idx} className='border border-sky-100 rounded-xl bg-sky-50 p-5 m-2'>
                              <p>{message.content}</p>
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-500'>Start a conversation by typing your message below.</p>
                      </div>
                    )
                  }
                </ScrollArea>
              }
            </div>
          </div>
          <form onSubmit={sendData}>
            <div className='mx-1 my-5 relative'>
              <Textarea className='h-full' placeholder='Type your message here...' rows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
              <Button className="absolute right-2 top-3 rounded-full"><ArrowUp /></Button>
            </div>
          </form>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Page