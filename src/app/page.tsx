"use client";
import CustomSlider from "@/components/ui/CustomSlider";
import Navbar from "@/components/ui/Navbar";
import dynamic from "next/dynamic";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <CustomSlider></CustomSlider>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
