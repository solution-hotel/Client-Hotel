import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import HeaderBooking from "./headerBooking/page";
import HeaderMain from "@/app/headerMain/page";
import HeaderTable from "@/app/headerTable/page";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <HeaderBooking />
        <HeaderMain />
        <HeaderTable />
        
        {children}
        {/* <footer style={{ backgroundColor: 'lightblue'}}>
          <p>Footer</p>
        </footer> */}
      </body>
    </html>
  );
}