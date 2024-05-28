import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

const ChatPage = () => {
    const [isOpenChat, setIsOpenChat] = useState(true);
    const handleCloseChat = () => {
        setIsOpenChat(false);
    }

    return (
        <>
            {isOpenChat && (
                <div className="absolute right-0 bottom-full mb-2 p-0 w-72 h-96 bg-white rounded-2xl shadow-lg animate-fadeIn flex flex-col">
                    <div className='bg-blue rounded-t-2xl flex items-center'>
                        <h1 className="font-bold text-center p-2 text-white text-xl flex-1">Chat Page</h1>
                        <button className='mr-2' onClick={handleCloseChat}><IoCloseSharp /></button>
                    </div>
                    <div className='flex-grow p-2 overflow-y-auto'>
                        <div className="flex items-start mb-4">
                            <img src="https://res.cloudinary.com/djveiec3v/image/upload/v1715757412/as56pqpqujdmw63hy15g.jpg" alt="" className='w-10 h-9 rounded-full mr-2'/>
                            <div className="bg-gray-300 p-3 rounded-lg">
                                <p className='text-sm'>Xin chào! Tôi có thể giúp gì cho bạn.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex border-t p-2 items-center'>
                        <input type="text" placeholder='Nhập tin nhắn...' className='flex-grow p-2 ' />
                        <button className='p-2 text-blue'>
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatPage
