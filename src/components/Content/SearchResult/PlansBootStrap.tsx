import { Table, Button } from "react-bootstrap";
import { Style } from "types/style";
import dayjs from "dayjs";
type DataType = {
  id: number;
  room: string;
  name: string;
  price: number;
  conditions: string[];
};
type Props = {
  data: DataType[];
  rules: {
    keyword: string;
    prefecture: number | null;
    checkin: string;
    checkout: string;
    number: number;
  };
  onReserveClick: (planId: number) => void;
};
const PlansBootStrap: React.FC<Props> = ({ data, rules, onReserveClick }) => {
  const planList = data.map((plan) => {
    const stayDateTo = dayjs(rules.checkout);
    const stayDateFrom = dayjs(rules.checkin);
    return (
      <tr id={`plan-${plan.id}`}>
        <td id={`plan-name-${plan.id}`}>{plan.name}</td>
        <td id={`plan-room-${plan.id}`}>{plan.room}</td>
        <td id={`plan-price-${plan.id}`}>{plan.price}</td>
        <td id={`plan-total-price-${plan.id}`}>
          {plan.price * rules.number * stayDateTo.diff(stayDateFrom, "day")}
        </td>
        <td>
          <Button
            variant="primary"
            onClick={() => onReserveClick(plan.id)}
            id={`plan-reserve-${plan.id}`}
          >
            予約
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <Table bordered hover style={style.table}>
      <thead>
        <tr>
          <th>name</th>
          <th>room</th>
          <th>price</th>
          <th>total-price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{planList}</tbody>
    </Table>
  );
};

export default PlansBootStrap;

const style: Style = {
  table: {
    margin: "0 auto",
  },
};
