"use client"

import React, { useState } from 'react';
import ChatPage from '../ChatPage/page';
import { BsChatFill } from 'react-icons/bs';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import useBookingData from '../../hooks/useBookingData';
import { format } from "date-fns";

interface HeaderTableProps {
    id: number;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ id }) => {
    const [showChat, setShowChat] = useState(false);
    const toggleChat = () => {
        setShowChat(!showChat);
    }

    const { bookingData, isLoading, isError } = useBookingData(id);

    console.log('Dữ liệu đặt phòng:', bookingData);

    if (isError) return <div>Error loading booking data.</div>;

    if (!bookingData) return null;

    const totalServiceCost = bookingData.Data.BookingItem.reduce((total, bookingItem) => {
        return total + (bookingItem.ProductPrice * bookingItem.Quantity);
    }, 0);

    const totalCost = bookingData.Data.RoomCost + totalServiceCost;

    return (
        <div className='container'>
            <div>
                <Table className='mt-10 text-center'>
                    <TableHeader className='w-full'>
                        <TableColumn className='border-2 py-5 bg-[#F3E07B]'>Mã Booking</TableColumn>
                        <TableColumn className='border-2 font-normal bg-[#F3E07B]'>{bookingData.Data.Id}</TableColumn>
                        <TableColumn className='border-2 bg-[#F3E07B]'>Tên khách hàng</TableColumn>
                        <TableColumn className='border-2 font-normal bg-[#F3E07B]'>{bookingData.Data.Guest.LastName} {bookingData.Data.Guest.FirstName}</TableColumn>
                    </TableHeader>
                    <TableBody className='justify-center'>
                        <TableRow key="1">
                            <TableCell className='border-2 py-5 font-bold'>Số điện thoại</TableCell>
                            <TableCell className='border-2 py-5'>{bookingData.Data.Guest.PhoneNumber}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Email</TableCell>
                            <TableCell className='border-2 py-5'>{bookingData.Data.Guest.Email}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell className='border-2 py-5 font-bold'>Ngày nhận phòng</TableCell>
                            <TableCell className='border-2 py-5'>{format(new Date(bookingData.Data.CheckinDate), "yyyy-MM-dd")}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Ngày trả phòng</TableCell>
                            <TableCell className='border-2 py-5'>{format(new Date(bookingData.Data.CheckoutDate), "yyyy-MM-dd")}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell className='border-2 py-5 font-bold'>Loại phòng</TableCell>
                            <TableCell className='border-2 py-5'>{bookingData.Data.RoomType.Name}</TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Giá phòng</TableCell>
                            <TableCell className='border-2 py-5'>{bookingData.Data.RoomType.Price} VND</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell className='border-2 py-5 font-bold'>Thời gian đặt phòng</TableCell>
                            <TableCell className='border-2 py-5'><span>{format(new Date(bookingData.Data.CreateAt), "yyyy-MM-dd")}</span></TableCell>
                            <TableCell className='border-2 py-5 font-bold'>Trạng thái</TableCell>
                            <TableCell className='border-2 py-5'>{bookingData.Data.Status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className='py-6'>
                <div className='font-bold text-3xl text-center mt-10'>
                    Dịch vụ bạn đã sử dụng
                </div>
                <div>
                    <table className="mt-10 text-center border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="border-2 bg-[#F3E07B] py-5">N.O</th>
                                <th className="border-2 bg-[#F3E07B]">Dịch Vụ</th>
                                <th className="border-2 bg-[#F3E07B]">Giá Tiền</th>
                                <th className="border-2 bg-[#F3E07B]">Số Lượng</th>
                                <th className="border-2 bg-[#F3E07B]">Tổng Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.Data.BookingItem.length === 0 ? (
                                <tr>
                                    <td className="border-2 py-5" colSpan={5}>Không có Data</td>
                                </tr>
                            ) : (
                                bookingData.Data.BookingItem.map((bookingItem, index) => (
                                    <tr key={index}>
                                        <td className="border-2 py-5">{index + 1}</td>
                                        <td className="border-2 py-5">{bookingItem.ProductName}</td>
                                        <td className="border-2 py-5">{bookingItem.ProductPrice} VND</td>
                                        <td className="border-2 py-5">{bookingItem.Quantity}</td>
                                        <td className="border-2 py-5">{bookingItem.ProductPrice * bookingItem.Quantity} VND</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='bg-test p-5' style={{ width: '100%' }}>
                <div className='' style={{ width: '20%' }}>
                    <div className='flex justify-between '>
                        <div className='font-bold'>Tiền phòng:</div>
                        <span>{bookingData.Data.RoomCost} VND</span>
                    </div>

                    <div className='flex justify-between'>
                        <div className='font-bold'>Tiền dịch vụ:</div>
                        <span>{totalServiceCost} VND</span>
                    </div>

                    <div className='flex justify-between'>
                        <div className='font-bold'>Tổng tiền:</div>
                        <span>{totalCost} VND</span>
                    </div>
                </div>
            </div>
            <div className='bg-test border-2 my-10'>
                <div className='my-2 mx-5'>
                    <div className='font-bold text-xl mb-3 text-red'>Lời nhắn</div>
                    <div className='mx-5'>
                        <ul style={{ listStyleType: 'disc' }}>
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
