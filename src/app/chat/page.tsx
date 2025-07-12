"use client";
import React from 'react'

import { post } from '@/lib/post';
import { ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { MessageType } from '../../types/mesage-types';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import ROLE from '@/constants/roles';
import ChatPane from '@/components/chat_pane';
import { ERROR } from '../../constants/error';

function Page() {

  const [convo, setConvo] = React.useState<MessageType[]>([]);
  const [content, setContent] = React.useState<string>("");


  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    setConvo((prev) => [
      ...prev,
      {
        role: ROLE.CLIENT,
        content: content
      }
    ])

    setContent("");

    const tempId = Date.now();

    setConvo((prev) => [
      ...prev,
      {
        role: ROLE.ASSISTANT,
        content: "",
        isLoading: true,
        tempId
      }
    ]);

    const assistantMessage = await post("/api/messages", content);
    

    setConvo((prev) =>
      prev.map((msg) =>
        (msg as MessageType & { tempId?: number }).tempId === tempId
          ? { role: ROLE.ASSISTANT, content: assistantMessage.data.response ?? ERROR.AI_RESPONSE }
          : msg
      )
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="p-2 flex-1 w-full h-screen">
        <div className='grid grid-cols-1 grid-rows-[1fr_auto] h-screen'>
          <div className='flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-hidden'>
              <ChatPane convo={convo} />
            </div>
          </div>
          <div className='grid grid-rows-[1fr_auto] p-1 gap-2'>
            <form onSubmit={sendData}>
              <div className='relative'>
                <Textarea className='h-full' placeholder='Type your message here...' rows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} value={content} />
                <Button className="absolute right-2 top-3 rounded-full"><ArrowUp /></Button>
              </div>
            </form>
            <footer className='p-2'>
              <div className='text-center text-gray-500 text-sm h-full'>
                <div>© {new Date().getFullYear()} Kabayan AI. All rights reserved.</div>
                <div>
                  Follow me @ <a href="https://github.com/raffiMartin069" className='text-blue-500 hover:underline'>GitHub</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Page