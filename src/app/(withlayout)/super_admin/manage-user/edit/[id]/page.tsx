"use client";
import { useVerifyUser } from "@/utils/customHooks";

const ManageUserPage = () => {
  useVerifyUser("super_admin");
  return (
    <div>
      <h1>super admin manage user page</h1>
    </div>
  );
};

export default ManageUserPage;
