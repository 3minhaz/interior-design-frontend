"use client";

import { Col, Row, message, Button } from "antd";
import Image from "next/image";
import login from "../../assets/login.png";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Form from "@/components/Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/Forms/CustomInput";
import { loginSchema } from "@/schemas/login";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";

type FormValues = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await loginUser({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        console.log(data, "checking data");
        //   router.push("/profile");
        message.success("User logged in successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
        <Col sm={12} md={16} lg={10}>
          <Image src={login} alt="login image" width={450} />
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1>Login to your account!</h1>
          <div>
            <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <CustomInput
                  name="email"
                  type="email"
                  size="large"
                  label="your email"
                  required
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <CustomInput
                  name="password"
                  type="password"
                  size="large"
                  label="Your Password"
                  required
                />
              </div>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
