import { Box, Text, useToken } from "@chakra-ui/react";
import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Props = { data: { choice: string; count: number }[] };

const Component: React.FC<Props> = ({ data }) => {
  const barHeight = 20;
  const height = data.length * (barHeight + 20);
  const [barColor, barLabelColor, yAxisColor] = useToken("colors", [
    "blue.400",
    "gray.50",
    "gray.50",
  ]);

  const allCounts = data.reduce((sum, result) => sum + result.count, 0);
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <Box>
      <Text ml={3}>{allCounts}件の回答</Text>
      <ResponsiveContainer height={height}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ right: 100, left: 100 }}
        >
          <Bar dataKey="count" barSize={barHeight} fill={barColor}>
            <LabelList
              dataKey="count"
              position="right"
              offset={5}
              fill={barLabelColor}
              formatter={(count: number) => {
                const percentage = Math.trunc((count / allCounts) * 100);
                return isNaN(percentage) ? "0%" : `${percentage}%`;
              }}
            />
          </Bar>
          <XAxis type="number" hide={true} />
          <YAxis
            type="category"
            dataKey="choice"
            tickLine={false}
            tick={{ fill: yAxisColor }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const SurveyPercentageChart = Component;
