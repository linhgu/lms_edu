import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComposedChartPage = ({ categories }: any) => {
  const courses = categories.map((item: any) => {
    return {
      name: item.name,
      'Tổng số khóa học': item.courses.length,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={550}>
      <ComposedChart
        width={500}
        height={400}
        data={courses}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 50,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" fontSize={12} padding={{ left: 20 }} />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Tổng số khóa học" barSize={60} fill="#f59e0b" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default ComposedChartPage;
