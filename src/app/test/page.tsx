"use client";

import { Layout, Row, Space, Spin } from "antd";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const TestPage = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  if (!userLoggedIn) {
    return null;
  }

  return (
    <div>
      <h1>private route</h1>
    </div>
  );
};

export default TestPage;
