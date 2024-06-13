'use client';

import Link from 'next/link';
import React from 'react';

const HeaderBooking = () => {
  return (
    <div style={{
      backgroundImage: "url('https://res.cloudinary.com/djveiec3v/image/upload/v1715050740/fkhxg1nsb2g1mzp95k9b.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      display: 'flex',
      width: '100%',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: 240 }}>
          <img src="https://res.cloudinary.com/djveiec3v/image/upload/v1715050464/u5b4ca9hkexca5ai1jvm.png" alt="" style={{objectFit: 'cover'}} />
        </div>
        <div style={{ fontWeight: '650', alignSelf: 'center', marginRight: 100, color: '#d2dae2' }}>
          <h1 style={{ fontWeight: '800', fontSize: 20, marginBottom: 10, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>BLUEHOUSE</h1>
          <p style={{ marginBottom: 5, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>SDT: (+84) 907 837 092</p>
        <p style={{ marginBottom: 5, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Email: info@gmail.com</p>
        <p style={{ marginBottom: 5, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Address: 20 Le Quang Hoa, Hoa Xuan, Cam Le</p>
        <p style={{ marginBottom: 5, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
          Xem địa chỉ của chúng tôi <Link href='https://maps.app.goo.gl/PJbzTM85acP8YDvf7' style={{ color: '#0173BC', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>tại đây</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderBooking
