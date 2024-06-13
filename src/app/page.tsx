"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderBooking from "./headerBooking/page";
import HeaderTable from "@/app/headerTable/page";
import React, { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderTable />
      </Suspense>
    </main>
  );
}