import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Line,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

var randomColor = require('randomcolor');

interface renderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: renderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CourseChart = ({ coursePurchase }: any) => {
  const data = coursePurchase.map((item: any) => {
    const color = randomColor();
    return {
      name: item.title,
      price: item.price,
      'Tổng số người học': item.purchases.length,
      color: color,
    };
  });

  console.log('courses', data);

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            height="100%"
            width="100%"
            cx="50%"
            cy="50%"
            paddingAngle={3}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="Tổng số người học"
            valueKey={'Tổng số người học'}
            nameKey={'name'}
          >
            {data.map((entry: { color: string | undefined }, index: any) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip payload={data} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex  flex-wrap space-x-2">
        {data.map((item: any, index: any) => {
          const color = item.color;

          return (
            <div key={index} className="max-w-[100px]">
              <div
                style={{
                  backgroundColor: color,
                }}
                className="h-6 w-6"
              />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CourseChart;
