import { Button, Space } from "antd";
import { prefecture as prefectureList } from "constants/condition";

import { Style } from "types/style";
import { Form } from "react-bootstrap";
type Props = {
  keyword: string;
  prefecture: number | null;
  checkin: string;
  checkout: string;
  number: number;
  currentDate: string;
  nextDate: string;
  setKeyword: (e: any) => void;
  setPrefecture: (e: any) => void;
  setCheckin: (e: any) => void;
  setCheckout: (e: any) => void;
  setNumber: (e: any) => void;
  onSearchClick: () => void;
};

const SearchForm: React.FC<Props> = ({
  keyword,
  prefecture,
  checkin,
  checkout,
  number,
  currentDate,
  nextDate,
  setKeyword,
  setCheckin,
  setCheckout,
  setPrefecture,
  setNumber,
  onSearchClick,
}) => {
  return (
    <Space style={style.space}>
      <Form.Control
        id="keyword"
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        placeholder={"検索するキーワードを入力してください"}
        style={style.input}
      />
      <Form.Select
        id="prefecture"
        onChange={(e) => setPrefecture(Number(e.target.value))}
        style={style.select}
      >
        <option>都道府県を選択</option>
        {prefectureList.map((prefectureInfo) => (
          <option value={prefectureInfo.value}>{prefectureInfo.label}</option>
        ))}
      </Form.Select>
      <Form.Control
        id="checkin"
        type="date"
        onChange={(e) => {
          setCheckin(e.target.value);
        }}
        defaultValue={currentDate}
      />
      <Form.Control
        id="checkout"
        type="date"
        onChange={(e) => {
          setCheckout(e.target.value);
        }}
        defaultValue={nextDate}
      />
      <Form.Control
        id="number"
        type="number"
        onChange={(e: any) => {
          setNumber(Number(e.target.value));
        }}
        defaultValue={2}
        style={style.inputNumber}
      />
      <Button
        id="search"
        type="primary"
        htmlType="submit"
        onClick={() => onSearchClick()}
        disabled={Boolean(!prefecture || !checkin || !checkout || !number)}
      >
        Search
      </Button>
    </Space>
  );
};

export default SearchForm;

const style: Style = {
  select: { width: "100px" },
  input: { width: "300px" },
  inputNumber: { width: "100px" },
  space: { width: "100%" },
};
