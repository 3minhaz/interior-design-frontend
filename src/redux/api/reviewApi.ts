import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/reviews";
export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findReview: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${REVIEW_URL}/get/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useFindReviewQuery } = reviewApi;
