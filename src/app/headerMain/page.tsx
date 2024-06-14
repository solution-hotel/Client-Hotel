'use client'

import useBookingData from '@/hooks/useBookingData';
import { useSearchParams } from 'next/navigation';
import React from 'react'

interface HeaderTableProps {
  id: number
}

const HeaderMain = () => {
  const searchParams = useSearchParams();

  const id = parseInt(searchParams.get("id") || "1", 10);
  const { bookingData, isLoading, isError } = useBookingData(id);

  const guestName = bookingData?.Data?.Guest?.LastName ? (
    <b><i>{bookingData.Data.Guest.LastName}</i></b>
  ) : null ;

  return (
    <div className='container border-b border-grey-200 py-6'>
      <div className=" sm:block">
        <div className="font-bold text-3xl sm:pb-0 text-blackish mb-5">
          Thông tin đặt phòng
        </div>
        <p>Xin chào <b><i>{guestName},</i></b> cảm ơn quý khách đã lựa chọn <b><i className='text-blue'>BlueHouse.</i></b>  <br />
          Đây là thông tin đặt phòng của bạn</p>
      </div>
    </div>
  )
}

export default HeaderMain
