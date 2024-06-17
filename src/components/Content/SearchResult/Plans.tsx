import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { condition } from "constants/condition";
type DataType = {
  id: number;
  room: string;
  name: string;
  price: number;
  conditions: string[];
};
const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (value, { id }) => <p id={`plan-name-${id}`}>{value}</p>,
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
    render: (value, { id }) => <p id={`plan-room-${id}`}>{value}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value, { id }) => <p id={`plan-price-${id}`}>{value}</p>,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "conditions",
    render: (_, { conditions }) => (
      <>
        {conditions.map((tag: string) => {
          return (
            // @ts-ignore
            <Tag color={condition[tag]["color"]} key={tag}>
              {/* @ts-ignore */}
              {condition[tag]["name"]}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <Space size="middle"></Space>,
  },
];
const Plans: React.FC<{ data: DataType[] }> = ({ data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => `plan-${record.id}`}
    />
  );
};

export default Plans;
