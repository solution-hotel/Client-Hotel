"use client"

import React, { useState } from 'react';
import ChatPage from '../ChatPage/page';
import { BsChatFill } from 'react-icons/bs';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import useBookingData from '../../hooks/useBookingData';

const HeaderTable: React.FC = () => {
    const [showChat, setShowChat] = useState(false);
    const toggleChat = () => {
        setShowChat(!showChat);
    }
    // const { bookingData, isLoading, isError } = useBookingData(id); 

    const { bookingData, isLoading, isError } = useBookingData(38); 
    console.log(bookingData?.Guest)
    console.log(bookingData, "roomtype: ");
    console.log(bookingData?.BookingItem, "bookingItem: ")
    
    if (isError) return <div>Error loading booking data.</div>;

    if (!bookingData) return null;

    const { PhoneNumber, Email, FirstName, checkInDate, checkOutDate} = bookingData.Guest
    const { Price, Name} = bookingData.RoomType
    const { ProductName, Quantity, ProductPrice, TotalPrice } = bookingData.BookingItem
    const { Id, bookingCode, customerName, Guest, BookingItem, RoomType, bookingTime, Status, roomType, RoomCost, ServiceCost, TotalCost, notes, contactPhone, contactEmail, CreateAt } = bookingData;
// const datein = bookingData.

    return (
        <div className='container'>
            <div>
                <Table className='mt-10 text-center'>
                    <TableHeader className='w-full'>
                        <TableColumn className='border-2 py-5 bg-gray-400'>Mã Booking</TableColumn>
                        <TableColumn className='border-2 font-normal bg-gray-400'>{Id}</TableColumn>
                        <TableColumn className='border-2 bg-gray-400'>Tên khách hàng</TableColumn>
                        <TableColumn className='border-2 font-normal bg-gray-400'>{FirstName}</TableColumn>
                    </TableHeader>
                    <TableBody className='justify-center'>
                        <TableRow key="1">
                            <TableCell className='border-2 py-5 font-bold'>Số điện thoại</TableCell>
                            <TableCell className='border-2 py-5'>{PhoneNumber}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Email</TableCell>
                            <TableCell className='border-2 py-5'>{Email}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell className='border-2 py-5 font-bold'>Ngày nhận phòng</TableCell>
                            <TableCell className='border-2 py-5'>{checkInDate}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Ngày trả phòng</TableCell>
                            <TableCell className='border-2 py-5'>{checkOutDate}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell className='border-2 py-5 font-bold'>Loại phòng</TableCell>
                            <TableCell className='border-2 py-5'>{Name}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Giá phòng</TableCell>
                            <TableCell className='border-2 py-5'>{Price} VND</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell className='border-2 py-5 font-bold'>Thời gian đặt phòng</TableCell>
                            <TableCell className='border-2 py-5'><span>{CreateAt}</span></TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Trạng thái</TableCell>
                            <TableCell className='border-2 py-5'>{Status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className='py-6'>
                <div className='font-bold text-3xl text-center mt-10'>
                    Dịch vụ bạn đã sử dụng
                </div>
                <div>
                    <Table className='mt-10 text-center'>
                        <TableHeader>
                            <TableColumn className='border-2 bg-gray-400 py-5'>N.O</TableColumn>
                            <TableColumn className='border-2 bg-gray-400'>Dịch Vụ</TableColumn>
                            <TableColumn className='border-2 bg-gray-400'>Giá Tiền</TableColumn>
                            <TableColumn className='border-2 bg-gray-400'>Số Lượng</TableColumn>
                            <TableColumn className='border-2 bg-gray-400'>Tổng Tiền</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {BookingItem?.map((bookingItem, index) => (
                                <TableRow key={index}>
                                    <TableCell className='border-2 py-5'>{index + 1}</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingItem.Item.ProductName}</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingItem.Item.ProductPrice} VND</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingItem.Quantity}</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingItem.TotalPrice} VND</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className=' bg-test p-5' style={{ width: '100%' }}>
                <div className='' style={{ width: '30%' }}>
                    <div className='flex justify-between '>
                        <div className='font-bold'>Tiền phòng:</div>
                        <span>{RoomCost} VND</span>
                    </div>

                    <div className='flex justify-between'>
                        <div className='font-bold'>Tiền dịch vụ:</div>
                        <span>{ServiceCost} VND</span>
                    </div>

                    <div className='flex justify-between'>
                        <div className='font-bold'>Tổng tiền:</div>
                        <span>{TotalCost} VND</span>
                    </div>
                </div>
            </div>
            <div className=' border-2 my-10'>
                <div className='my-2 mx-5'>
                    <div className='font-bold text-xl mb-3 text-red'>Lời nhắn</div>
                    <div className='mx-5'>
                        <ul style={{ listStyleType: 'disc' }}>
                            {/* {notes?.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))} */}
                            <li>Nên đem theo áo mưa và chuẩn bị một vài bộ áo quần giữ ấm bởi vì thời tiết khá lạnh</li>
                            <li>Ban đêm trời sẽ hơi nóng nên hãy chuẩn bị một vài bộ quần áo mát</li>
                            <li>Hoa sẽ nở vào tháng 4 này nên hãy chuẩn bị những máy thật tốt để chụp hình</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mb-10'>
                <div className='font-medium'>
                    Trong trường hợp Quý khách cần thêm thông tin hay sự hỗ trợ, xin liên lạc với chúng tôi qua
                </div>
                <div className='flex mt-5 justify-between'>
                    <div className='font-bold'>
                        <div className='flex'>SDT: <p className='mx-10'>(+84) 907 837 092</p></div>
                        <div className='flex'>Email: <p className='mx-10'>info@gmail.com</p></div>
                    </div>
                    <div className="relative">
                        <button
                            className='flex items-center border-2 w-full md:w-40 sm:w-40 rounded-3xl bg-black text-white justify-center shadow-2xl py-2'
                            onClick={toggleChat}
                        >
                            <div className="mr-2"><BsChatFill /></div>
                            <div className="font-bold">Chat</div>
                        </button>
                        {showChat && <ChatPage />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTable;
