import { Button, Input, Space } from "antd";
type Props = {
  onInputChange: (e: any) => void;
  onSearchClick: () => void;
};
const SearchHotelForm: React.FC<Props> = ({ onInputChange, onSearchClick }) => {
  return (
    <Space>
      <Input id="keyword" type="text" onChange={onInputChange} />

      <Button type="primary" htmlType="submit" onClick={onSearchClick}>
        Search
      </Button>
    </Space>
  );
};

export default SearchHotelForm;
