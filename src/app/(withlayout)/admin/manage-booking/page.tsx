"use client";
import { useVerifyUser } from "@/utils/verifyUser";
import React from "react";

const ManageBookingPage = () => {
  useVerifyUser("admin");
  return (
    <div>
      <h1>this is manage booking page</h1>
    </div>
  );
};

export default ManageBookingPage;
