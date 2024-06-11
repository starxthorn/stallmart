"use client";
import React from "react";
import {
  ResponsiveContainer,
  Bar,
  BarChart as Bars,
  XAxis,
  YAxis,
} from "recharts";

const BarChart = () => {
  const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  return (
    <>
      <ResponsiveContainer width={"100%"} height={500}>
        <Bars data={data}>
          <XAxis
            dataKey={"name"}
            tickLine={false}
            axisLine={false}
            stroke="black"
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="black"
            fontSize={12}
            tickFormatter={(value: any) => `$${value}`}
          />
          <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
        </Bars>
      </ResponsiveContainer>
    </>
  );
};

export default BarChart;
