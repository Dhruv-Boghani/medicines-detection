// src/app/page.tsx
"use client";
import axios from "axios";
import HeroSection from "./component/HeroSection";
import { MedicineCategories } from "./component/Medicine-categories";
import { RecentSearches } from "./component/Recent-searches";
import { ScanForFreeSection } from "./component/Scan-for-free-section";
import { TopSearchedMedicines } from "./component/Top-searched-medicines";
import { useEffect } from "react";

// Assuming Header is in layout or you move it here

export default function Home() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/");
        console.log("API response:", response.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* If Header is not in layout.tsx, put it here: */}
      {/* <Header /> */}
      <HeroSection />
      <RecentSearches />
      <MedicineCategories />
      <ScanForFreeSection />
      <TopSearchedMedicines />
      {/* Other sections will go here */}
    </div>
  );
}
