"use client";
// src/components/sections/scan-for-free-section.tsx
import React, { useState } from "react";
import Link from "next/link";

export function ScanForFreeSection() {
  const [, setIsScanDialogOpen] = useState(false);
  return (
    <section className="bg-blue-50 py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 leading-tight">
            Scan for free
          </h2>
          <p className="text-gray-700 text-lg">
            Limited time <span className="font-semibold">offe Free</span> per
            user
          </p>
        </div>
        <Link
          href="/scan-medicineDialog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 justify-center items-center flex rounded-md text-base font-semibold transition-colors duration-300"
          onClick={() => setIsScanDialogOpen(true)}
        >
          Start Scanning
        </Link>
      </div>
    </section>
  );
}
