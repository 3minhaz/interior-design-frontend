"use client";
import CustomCard from "@/components/ui/CustomCard";
import CustomCategoryService from "@/components/ui/CustomCategoryService";
import CustomOverview from "@/components/ui/CustomOverview";
import CustomReviews from "@/components/ui/CustomReviews";

import CustomSlider from "@/components/ui/CustomSlider";
import CustomUpcomingCard from "@/components/ui/CustomUpcomingCard";
import FooterPage from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import dynamic from "next/dynamic";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <CustomSlider></CustomSlider>
      <CustomCard />
      <CustomUpcomingCard />
      <CustomCategoryService />
      <CustomReviews />
      <CustomOverview />
      <FooterPage />
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
