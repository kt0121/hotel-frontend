export type Hotel = {
  id: number;
  name: string;
  prefecture: number;
  address: string;
  conditions: string[];
  rooms: Room[];
  plans: Plan[][];
};

export type Room = {
  capacity: number;
  conditions: string[];
  count: number;
  id: number;
  name: string;
};

export type Plan = {
  id: number;
  name: string;
  room_id: number;
  price: number;
  conditions: string[];
};
