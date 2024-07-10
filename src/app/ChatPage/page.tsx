'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";  

const ChatPage = () => {
    const [isOpenChat, setIsOpenChat] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi có thể giúp gì cho bạn.",
            time: new Date(),
            fromUser: false,
        }
    ]);
    const [startTime, setStartTime] = useState(new Date());

    const handleCloseChat = () => {
        setIsOpenChat(false);
    }

    const handleSubmitMessage = (event : any) => {
        event.preventDefault();
        const newMessage = {
            id: messages.length + 1,
            text: event.target.message.value,
            time: new Date(),
            fromUser: true
        };
        setMessages([...messages, newMessage]);
        event.target.reset();
    }

    const formatTime = (date : any) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    const formatStartTime = () => {
        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();
        // const day = startTime.getDate();
        // const month = startTime.getMonth() + 1;
        // const year = startTime.getFullYear();
        return `TODAY ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return (
        <>
            {isOpenChat && (
                <div className="fixed bottom-12 right-0 m-6">
                    <div className="absolute right-0 bottom-full mb-2 p-0 bg-white rounded-xl shadow-lg animate-fadeIn flex flex-col" style={{ width: "22rem", height: "32rem" }}>
                        <div className='bg-blue rounded-t-xl flex items-center'>
                            <img className="w-8 h-8 m-3 rounded-full ring-1 ring-orange-300 dark:ring-orange-500"
                                src="https://i.pravatar.cc/150?u=a092581d4ef9026700d" />
                            <p className="p-2 text-white text-md flex-1 ml-[-6px]">Receptionist</p>
                            <Link className='pr-6 text-3xl' href="./room"><IoVideocam /></Link>
                            <button className='mr-4 border-2 rounded-full bg-black text-white' onClick={handleCloseChat}><IoCloseSharp /></button>
                        </div>
                        <div className='flex-grow p-2 overflow-y-auto'>
                            <div className='text-center text-xs text-gray-500 m-4'>{formatStartTime()}</div>
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-start mb-4 ${message.fromUser ? 'justify-end' : 'justify-start'}`}>
                                    {!message.fromUser && (
                                        <div className="w-8 h-8 rounded-full ring-1 ring-orange-300 dark:ring-orange-500">
                                            <img className="w-full h-full rounded-full"
                                                src="https://i.pravatar.cc/150?u=a092581d4ef9026700d"
                                                alt="Avatar"
                                            />
                                        </div>
                                    )}
                                    <div className={`p-2 ml-2 rounded-lg overflow-hidden ${message.fromUser ? 'bg-blue text-white self-end mb-[-10px] w-auto' : 'bg-gray-300 w-56'}`}>
                                        <p className='text-sm break-word'>{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.fromUser ? 'text-white' : 'text-gray-600'}`}>{formatTime(message.time)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmitMessage}>
                            <div className='flex border-t p-2 items-center mt-auto'>
                                <input
                                    type="text"
                                    name="message"
                                    placeholder='Nhập tin nhắn...'
                                    className='flex-grow p-2 outline-none border-none border-gray-300 border rounded-md' />
                                <button className='p-2 text-blue'>
                                    <IoSend />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatPage;
