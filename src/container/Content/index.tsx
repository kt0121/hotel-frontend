import { Layout } from "antd";
import SearchHotelForm from "components/Content/SearchHotelForm";
import { useGetAPI } from "hooks/useGetAPI";
import { useTokenContext } from "provider/token";
import { useEffect, useState } from "react";
import { Style } from "types/style";

const { Content: AntdContent } = Layout;
const Content = () => {
  const { token } = useTokenContext();
  const [
    getHotels,
    { data: hotelData, loading: isHotelGetLoading, status: hotelGetStatus },
  ] = useGetAPI<any>("/hotels");

  const [keyword, setKeyword] = useState<string>("");
  const onInputChange = (e: any) => {
    setKeyword(e.target.value);
  };
  const onSearchClick = () => {
    getHotels(token!, { keyword: keyword });
  };

  return (
    <AntdContent style={style.content}>
      <SearchHotelForm
        onInputChange={onInputChange}
        onSearchClick={onSearchClick}
      />
      {hotelData &&
        hotelData.forEach((d: any) => {
          console.log(d);
          return <div>{d.address}</div>;
        })}
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
