"use client";
import { useVerifyUser } from "@/utils/verifyUser";
import React from "react";

const ManageUserPage = () => {
  useVerifyUser("admin");
  return (
    <div>
      <h1>this is admin manage user page</h1>
    </div>
  );
};

export default ManageUserPage;
