import { Layout, Space } from "antd";
import SearchResult from "components/Content/SearchResult";
import SearchForm from "components/Content/SearchForm";
import { useGetAPI } from "hooks/useGetAPI";
import { useTokenContext } from "provider/token";
import { useState } from "react";
import { ResHotel, ResReserve } from "types/response";
import { Style } from "types/style";
import dayjs from "dayjs";
import { usePostAPI } from "hooks/usePostAPI";
import ReserveResultModal from "components/Content/ReverveResultModal";
const now = dayjs();
const currentDate = now;
const nextDate = now.add(1, "d");
const { Content: AntdContent } = Layout;
const Content = () => {
  const { token } = useTokenContext();
  const [getHotels] = useGetAPI<ResHotel>("/hotels");
  const resGetHotel: ResHotel = [
    {
      id: 1,
      name: "Sunset Hotel",
      prefecture: 13,
      address: "123 Tokyo Street, Shibuya, Tokyo",
      conditions: ["Free Wi-Fi", "No Smoking", "Pet Friendly"],
      rooms: [
        {
          capacity: 2,
          conditions: ["Ocean View", "Balcony"],
          count: 5,
          id: 101,
          name: "Double Room",
        },
        {
          capacity: 4,
          conditions: ["Mountain View", "Balcony"],
          count: 3,
          id: 102,
          name: "Family Room",
        },
      ],
      plans: [
        [
          {
            id: 1,
            name: "Standard Plan",
            room_id: 101,
            price: 10000,
            conditions: ["Breakfast Included", "Free Cancellation"],
          },
          {
            id: 2,
            name: "Holiday Special",
            room_id: 101,
            price: 12000,
            conditions: [
              "Breakfast Included",
              "Dinner Included",
              "Free Cancellation",
            ],
          },
        ],
        [
          {
            id: 3,
            name: "Standard Plan",
            room_id: 102,
            price: 15000,
            conditions: ["Breakfast Included", "Free Cancellation"],
          },
          {
            id: 4,
            name: "Family Getaway",
            room_id: 102,
            price: 18000,
            conditions: [
              "Breakfast Included",
              "Dinner Included",
              "Free Cancellation",
            ],
          },
        ],
      ],
    },
    {
      id: 2,
      name: "Mountain View Inn",
      prefecture: 5,
      address: "456 Snowy Lane, Sapporo, Hokkaido",
      conditions: ["Free Parking", "No Smoking"],
      rooms: [
        {
          capacity: 2,
          conditions: ["Mountain View", "Heated Floors"],
          count: 8,
          id: 201,
          name: "Twin Room",
        },
        {
          capacity: 3,
          conditions: ["City View", "Heated Floors"],
          count: 4,
          id: 202,
          name: "Triple Room",
        },
      ],
      plans: [
        [
          {
            id: 5,
            name: "Winter Wonderland",
            room_id: 201,
            price: 9000,
            conditions: ["Breakfast Included", "Free Ski Pass"],
          },
          {
            id: 6,
            name: "Spring Special",
            room_id: 201,
            price: 8000,
            conditions: ["Breakfast Included"],
          },
        ],
        [
          {
            id: 7,
            name: "Summer Escape",
            room_id: 202,
            price: 11000,
            conditions: ["Breakfast Included", "Free City Tour"],
          },
          {
            id: 8,
            name: "Autumn Retreat",
            room_id: 202,
            price: 10000,
            conditions: ["Breakfast Included", "Late Checkout"],
          },
        ],
      ],
    },
  ];

  const [
    postReserve,
    {
      data: resReserve,
      loading: isPostReserveLoading,
      status: postReserveStatus,
    },
  ] = usePostAPI<ResReserve>("/reservations");
  const [keyword, setKeyword] = useState<string>("");
  const [prefecture, setPrefecture] = useState<number | null>(null);
  const [checkin, setCheckin] = useState<string>(
    currentDate.format("YYYY-MM-DD")
  );
  const [checkout, setCheckout] = useState<string>(
    nextDate.format("YYYY-MM-DD")
  );
  const [number, setNumber] = useState<number>(2);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const rules = { keyword, prefecture, checkin, checkout, number };
  const setRules = {
    setKeyword,
    setPrefecture,
    setCheckin,
    setCheckout,
    setNumber,
  };
  const onSearchClick = () => {
    getHotels(token!, rules);
  };
  const onReserveClick = (planId: number) => {
    postReserve(token!, { plan_id: planId, checkin, checkout, number });
    setIsModalOpen(true);
  };

  return (
    <AntdContent style={style.content}>
      {/* {token && ( */}
      <Space direction="vertical" size={"large"}>
        <SearchForm
          onSearchClick={onSearchClick}
          currentDate={currentDate.format("YYYY-MM-DD")}
          nextDate={nextDate.format("YYYY-MM-DD")}
          {...rules}
          {...setRules}
        />
        {resGetHotel && (
          <SearchResult
            data={resGetHotel}
            rules={rules}
            onReserveClick={onReserveClick}
          />
        )}
        <ReserveResultModal
          isModalOpen={isModalOpen}
          isPostReserveLoading={isPostReserveLoading}
          postReserveStatus={postReserveStatus}
          reservationId={resReserve?.id}
          handleModalClose={handleModalClose}
        />
      </Space>
      {/* )} */}
    </AntdContent>
  );
};

export default Content;
const style: Style = {
  content: {
    textAlign: "center",

    width: "80vw",
    minWidth: "1000px",
    maxWidth: "1400px",
    margin: "0 auto",
    height: "100%",
  },
};
