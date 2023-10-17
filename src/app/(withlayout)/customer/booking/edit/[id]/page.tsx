"use client";

import FormDatePicker from "@/components/Forms/CustomDatePicker";
import CustomInput from "@/components/Forms/CustomInput";
import Form from "@/components/Forms/Form";
import { useGetSingleBookingQuery } from "@/redux/api/bookingApi";
import { Col, Row, message, Button } from "antd";
import React from "react";
import dayjs from "dayjs";
import CustomSelectField from "@/components/Forms/CustomSelectField";
import { BookingStatusOptions } from "@/constants/global";

type IDProps = {
  params: any;
};

const BookingEdit = ({ params }: IDProps) => {
  const { id } = params;
  // console.log(id);
  const { data, isLoading } = useGetSingleBookingQuery(id);
  // console.log(data, "checing data");

  const onSubmit = async (values: any) => {
    const tempObject = { ...values };
    tempObject["date"] = dayjs(tempObject["date"]).toISOString();
    console.log(tempObject, "checking tempObject");
    message.loading("Updating.....");
    try {
      // console.log(data);
      // await updateDepartment({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    date: data?.date || "",
    bookingStatus: data?.bookingStatus || "",
  };
  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div>
      <h1>Update your booking</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            {/* <CustomInput name="bookingStatus" label="Booking Status" /> */}
            <CustomSelectField
              options={BookingStatusOptions}
              name="bookingStatus"
              label="Booking Status"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormDatePicker
              defaultValue={defaultValues?.date}
              name="date"
              label="Update your date"
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default BookingEdit;
