import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import HeaderBooking from "./headerBooking/page";
import HeaderMain from "@/app/headerMain/page";
import HeaderTable from "@/app/headerTable/page";
import {Suspense} from 'react'
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking Information",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Suspense>
          <HeaderBooking />
          <HeaderMain />
          <HeaderTable />
      
        {children}
        {/* <footer style={{ backgroundColor: 'lightblue'}}>
          <p>Footer</p>
        </footer> */}
          </Suspense>
      </body>
    </html>
  );
}