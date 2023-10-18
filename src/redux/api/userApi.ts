import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (userData) => ({
        url: USER_URL,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagTypes.register],
    }),
    myProfile: build.query({
      query: () => ({
        url: `${USER_URL}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllAdmin: build.query({
      query: () => ({
        url: `${USER_URL}/all-admin`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: (arg) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useMyProfileQuery,
  useGetAllUserQuery,
  useGetAllAdminQuery,
} = userApi;
