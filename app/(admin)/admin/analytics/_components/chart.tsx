'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card } from '@/components/ui/card';

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
  isPrice?: boolean;
}

export const Chart: React.FC<ChartProps> = ({ data, isPrice }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#88888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            allowDecimals={false}
            fontSize={12}
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => {
              return isPrice ? `$${value}` : value;
            }}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
