import React from 'react'

const HeaderMain = () => {
  return (
    <div className='container border-b border-grey-200 py-6'>
      <div className=" sm:block">
        <div className="font-bold text-3xl sm:pb-0 text-blackish mb-5">
          Thông tin đặt phòng
        </div>
        <p>xin chào <b><i>Nguyễn Hữu Thắng,</i></b> cảm ơn quý khách đã lựa chọn <b><i className='text-blue'>BlueHouse.</i></b>  <br />
        Đây là thông tin đặt phòng của bạn</p>
      </div>
    </div>
  )
}

export default HeaderMain
