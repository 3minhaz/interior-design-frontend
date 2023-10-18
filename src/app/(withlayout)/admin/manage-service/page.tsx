"use client";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import { message } from "antd";
import CustomTable from "@/components/ui/CustomTable";
import { useVerifyUser } from "@/utils/verifyUser";
import ActionBar from "@/components/ui/ActionBar";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import UMBreadCrumb from "@/components/ui/BreadCrumb";

const ManageServicePage = () => {
  useVerifyUser("admin");
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllServiceQuery({ ...query });
  const services = data?.services;
  const meta = data?.meta;
  // const updateBookings = bookings?.map((booking: any) => ({
  //   id: booking?.id,
  //   bookingStatus: booking?.bookingStatus,
  //   createdAt: booking?.createdAt,
  //   serviceStatus: booking?.service?.serviceStatus,
  //   title: booking?.service?.title,
  //   price: booking?.service?.price,
  //   date: booking?.date,
  //   location: booking?.service?.location,
  // }));
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      //   const res = await deleteAcademicDepartment(id);
      //   if (res) {
      message.success("Department Deleted successfully");
      //   }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Service Status",
      dataIndex: "serviceStatus",
      //   render: function (data: any) {
      //     return <>{data?.title}</>;
      //   },
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/manage-service/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                // onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="Manage service page">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/admin/manage-service/create">
            <Button type="primary">Create service</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <CustomTable
        loading={isLoading}
        columns={columns}
        dataSource={services}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageServicePage;
