"use client"

import React, { useEffect, useState } from 'react';
import ChatPage from '../ChatPage/page';
import { BsChatFill } from 'react-icons/bs';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import useBookingData from '../../hooks/useBookingData';
import { useParams, useSearchParams } from 'next/navigation';
import { format } from "date-fns";
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher';
import { getExtraItems } from "../utils/api/extraitems"


const HeaderTable = () => {
    const [showChat, setShowChat] = useState(false);
    const [extraItems, setExtraItems] = useState([])

    const toggleChat = () => {
        setShowChat(!showChat);
    }

    useEffect(() => {
        let isMouted = true;

        const fetchData = async () => {
            try {
                const data = await getExtraItems();
                setExtraItems(data.Data);
            } catch (err) {
                console.error(err);
            }
        }

        if (isMouted) {
            fetchData();
            isMouted = false;
        }
        return () => {
            isMouted = false;
        }

    }, []);

    const statusMap: { [key: number]: string } = {
        1: 'Confirmed',
        2: 'Checkin',
        3: 'Checkout',
        4: 'Completed',
        5: 'Canceled'
    }

    const searchParams = useSearchParams()
    const id = searchParams.get('id');

    // const { data: bookingData, error } = useSWR(`http://192.168.1.114:83/booking/38`,
    //     fetcher
    // );
    const { data: bookingData, error } = useSWR(`http://api-pnv.bluejaypos.vn/booking/38`,
        fetcher
    );

    useEffect(() => {
        console.log('ID changed:', id);
    }, [id]);
    console.log('Dữ liệu đặt phòng:', bookingData);
    console.log("Dữ liệu của extra items", extraItems);


    if (!bookingData) return null;

    const totalServiceCost = bookingData && bookingData.Data && Array.isArray(bookingData.Data?.BookingItems)
        ? bookingData.Data?.BookingItems.reduce((total: number, bookingItem: any) => {
            return total + (bookingItem.TotalPrice);
        }, 0)
        : 0;

    let totalRoomCost = 0;
    let totalCost = 0;

    const checkInDate = new Date(bookingData.Data?.CheckinDate);
    const checkOutDate = new Date(bookingData.Data?.CheckoutDate);
    if (checkInDate && checkOutDate) {
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysStayed = timeDifference / (1000 * 3600 * 24);

        const roomRate = bookingData.Data?.RoomType.Price;
        totalRoomCost = daysStayed * roomRate;

        totalCost = totalRoomCost + totalServiceCost;
    }

    return (
        <div className='container'>
            {bookingData ? (
                <>
                    <div>
                        <Table className='mt-10 text-center'>
                            <TableHeader className='w-full'>
                                <TableColumn className='border-2 py-5 px-5 bg-[#D9D9D9]'>Mã Booking</TableColumn>
                                <TableColumn className='border-2 px-5 font-normal bg-[#D9D9D9]'>{bookingData.Data?.Id || 'N/A'}</TableColumn>
                                <TableColumn className='border-2 px-5 bg-[#D9D9D9]'>Tên khách hàng</TableColumn>
                                <TableColumn className='border-2 font-normal bg-[#D9D9D9]'>{bookingData.Data?.Guest?.LastName} {bookingData.Data?.Guest?.FirstName || 'N/A'}</TableColumn>
                            </TableHeader>
                            <TableBody className='justify-center'>
                                <TableRow key="1">
                                    <TableCell className='border-2 py-5 font-bold'>Số điện thoại</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.Guest?.PhoneNumber || 'N/A'}</TableCell>
                                    <TableCell className='border-2 py-5 font-bold'>Email</TableCell>
                                    <TableCell className='border-2 py-5 px-5'>{bookingData.Data?.Guest?.Email || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell className='border-2 py-5 font-bold'>Ngày nhận phòng</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.CheckinDate ? format(new Date(bookingData.Data.CheckinDate), "yyyy-MM-dd") : 'N/A'}</TableCell>
                                    <TableCell className='border-2 py-5 font-bold'>Ngày trả phòng</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.CheckoutDate ? format(new Date(bookingData.Data.CheckoutDate), "yyyy-MM-dd") : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell className='border-2 py-5 font-bold'>Loại phòng</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.RoomType?.Name || 'N/A'}</TableCell>
                                    <TableCell className='border-2 py-5 font-bold'>Giá phòng</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.RoomType?.Price ? `${bookingData.Data?.RoomType.Price.toLocaleString('en-US')} VND` : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow key="4">
                                    <TableCell className='border-2 py-5 font-bold'>Thời gian đặt phòng</TableCell>
                                    <TableCell className='border-2 py-5'>{bookingData.Data?.RoomType?.CreateAt ? format(new Date(bookingData.Data?.RoomType.CreateAt), "yyyy-MM-dd") : 'N/A'}</TableCell>
                                    <TableCell className='border-2 py-5 font-bold'>Trạng thái</TableCell>
                                    <TableCell className='border-2 py-5'>{statusMap[bookingData.Data?.Status] || 'Unknown'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    {bookingData.Data?.BookingItems?.length > 0 ? (
                        <div className='py-2 roomCost'>
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
                                        {bookingData?.Data?.BookingItems?.length > 0 && (
                                            bookingData?.Data?.BookingItems?.map((bookingItem: any, i: any) => {
                                                const item = extraItems.find(
                                                    (item: any) => item.id === bookingItem.ItemId
                                                );

                                                if (!item) {
                                                    return null;
                                                }

                                                return (
                                                    <tr
                                                        key={i}
                                                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300"
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                                                        >
                                                            {i + 1}
                                                        </th>
                                                        <td className="px-6 py-4">{(item as any)?.name}</td>
                                                        <td className="px-6 py-4">{(item as any)?.price.toLocaleString('en-US') + ' VNĐ'}</td>
                                                        <td className="px-6 py-4">{bookingItem.Quantity}</td>
                                                        <td className="px-6 py-4">{bookingItem.TotalPrice.toLocaleString('en-US') + ' VNĐ'}</td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        console.log("Khách hàng không sử dụng dịch vụ gì.")
                    )}
                    <div className='bg-test p-5 mt-10' style={{ width: '100%' }}>
                        <div className='' style={{ width: '20%' }}>
                            <div className='flex justify-between '>
                                <div className='font-bold'>Tiền phòng:</div>
                                <span>{totalRoomCost ? totalRoomCost.toLocaleString('en-US') + ' VNĐ' : "N/A"}</span>
                            </div>

                            <div className='flex justify-between'>
                                <div className='font-bold'>Tiền dịch vụ:</div>
                                <span>{totalServiceCost ? totalServiceCost.toLocaleString('en-US') + ' VNĐ' : "N/A"}</span>
                            </div>

                            <div className='flex justify-between'>
                                <div className='font-bold'>Tổng tiền:</div>
                                <span>{totalCost ? totalCost.toLocaleString('en-US') + ' VNĐ' : "N/A"}</span>
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
                </>
            ) : (
                <div className='text-center py-10'>
                    Không có Data
                </div>
            )}
            <div className='mb-10'>
                <div className='font-medium'>
                    Trong trường hợp Quý khách cần thêm thông tin hay sự hỗ trợ, xin liên lạc với chúng tôi qua
                </div>
                <div className='flex mt-5 justify-between'>
                    <div className='font-bold'>
                        <div className='flex'>SDT: <p className='mx-10'>(+84) 907 837 092</p></div>
                        <div className='flex'>Email: <p className='mx-10'>info@gmail.com</p></div>
                    </div>
                    <div className="fixed bottom-0 right-0 m-6">
                        <button
                            className="flex items-center border-2 z-40 w-full md:w-40 sm:w-40 rounded-3xl bg-black text-white 
                            justify-center shadow-2xl py-2 hover:bg-gray-600"
                            onClick={toggleChat}
                        >
                            <div className="mr-2">
                                <BsChatFill />
                            </div>
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
