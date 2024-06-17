import { Hotel } from "types/hotel";
import { Style } from "types/style";
import PlansBootStrap from "./PlansBootStrap";
import Accordion from "react-bootstrap/Accordion";
type Props = {
  data: Hotel[];
  rules: {
    keyword: string;
    prefecture: number | null;
    checkin: string;
    checkout: string;
    number: number;
  };
  onReserveClick: (planId: number) => void;
};
const SearchResult: React.FC<Props> = ({ data, rules, onReserveClick }) => {
  const hotelInfo = data.map((d, index) => {
    const planData = d.plans.flat().map((plan) => {
      const roomInfoIndex = d.rooms.findIndex((room) => {
        return room.id === plan.room_id;
      });
      const roomInfo = d.rooms[roomInfoIndex];
      return {
        room: roomInfo.name,
        ...plan,
      };
    });
    return (
      <Accordion.Item eventKey={String(index)} id={`hotel-${d.id}`}>
        <Accordion.Header>
          <p id={`hotel-name-${d.id}`}>{d.name}</p>
        </Accordion.Header>
        <Accordion.Body>
          <p id={`hotel-address-${d.id}`}>{d.address}</p>
          <PlansBootStrap
            data={planData}
            rules={rules}
            onReserveClick={onReserveClick}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <Accordion defaultActiveKey={"0"} style={style.collapse}>
      {hotelInfo}
    </Accordion>
  );
};

export default SearchResult;

const style: Style = {
  collapse: {
    width: "100%",
    margin: "0 auto",
  },
};
