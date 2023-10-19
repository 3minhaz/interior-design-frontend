"use client";
import { DatePicker, message } from "antd";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "antd/es/layout/layout";
import CustomModal from "@/components/ui/CustomModal";
import { useFindReviewQuery } from "@/redux/api/reviewApi";

const DetailsPage = ({ params }: any) => {
  // @ts-ignore
  const { role, id } = getUserInfo();
  const [date, setSelectedDate] = useState(dayjs());
  const [createBooking] = useCreateBookingMutation();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data, isLoading } = useGetSingleServiceQuery(params?.id);
  const { data: reviewData, isLoading: reviewLoading } = useFindReviewQuery(
    params?.id
  );
  if (isLoading) {
    return <p>loading</p>;
  }

  console.log(reviewData, "reviewData .....");
  const handleBooking = async () => {
    try {
      if (!id) {
        router.push("/login");
      }

      const bookingData = {
        userId: id,
        serviceId: params.id,
        date: dayjs(date).toISOString(),
      };
      const res = await createBooking(bookingData);
      console.log(res, "checkng response");
      // @ts-ignore
      if (res?.data?.id) {
        message.success("Booking created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Navbar></Navbar>
      </div>
      <div style={{ width: "50%", marginLeft: "30px", minHeight: "100vh" }}>
        <h1>Title: {data?.title}</h1>
        <span>
          Choose your booking date
          <DatePicker
            style={{ width: "40%", margin: "10px 0 10px 20px" }}
            size="large"
            defaultValue={dayjs()}
            onChange={(date, dateString) => setSelectedDate(date!)}
          />
        </span>
        <br />
        <p style={{ margin: "10px 0" }}>Description: {data?.description}</p>
        <h4 style={{ marginBottom: "20px" }}>Price: {data?.price}</h4>
        <Button
          disabled={role && role !== "CUSTOMER"}
          onClick={() => {
            setOpen(true);
          }}
          // onClick={() => handleBooking(params?.id)}
          type="primary"
        >
          Book Service
        </Button>
      </div>
      <CustomModal
        title="Booking service"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handleBooking()}
      >
        <p className="my-5">Do you want to booking this service?</p>
      </CustomModal>
    </div>
  );
};

export default DetailsPage;
