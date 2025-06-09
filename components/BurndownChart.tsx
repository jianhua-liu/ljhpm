import React from 'react';

interface BurndownChartProps {
  data: { date: string; remaining: number }[];
  initialStoryPoints: number;
}

const chartWidth = 500;
const chartHeight = 300;
const padding = 40;

export default function BurndownChart({ data, initialStoryPoints }: BurndownChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center text-muted-foreground">没有数据可显示燃尽图</div>;
  }

  // 计算x和y轴的比例尺
  const maxRemaining = Math.max(...data.map(d => d.remaining), initialStoryPoints);
  const minRemaining = 0;

  const xMax = data.length - 1;
  const yMax = maxRemaining;

  const xScale = (chartWidth - padding * 2) / xMax;
  const yScale = (chartHeight - padding * 2) / yMax;

  const points = data.map((d, i) => {
    const x = padding + i * xScale;
    const y = chartHeight - padding - d.remaining * yScale;
    return `${x},${y}`;
  }).join(' ');

  // 理想燃尽线
  const idealPoints = `${
    padding
  },${chartHeight - padding - initialStoryPoints * yScale} ${
    padding + (data.length - 1) * xScale
  },${chartHeight - padding - 0 * yScale}`;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* X轴（日期） */}
        {data.map((d, i) => (
          <text
            key={i}
            x={padding + i * xScale}
            y={chartHeight - padding + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {new Date(d.date).getMonth() + 1}/{new Date(d.date).getDate()}
          </text>
        ))}
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />

        {/* Y轴（剩余工作量） */}
        {[0, maxRemaining / 2, maxRemaining].map((val, i) => (
          <text
            key={i}
            x={padding - 10}
            y={chartHeight - padding - val * yScale}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
            fill="#666"
          >
            {val}
          </text>
        ))}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="#ccc"
          strokeWidth="1"
        />

        {/* 理想燃尽线 */}
        <polyline
          fill="none"
          stroke="#FF6384"
          strokeWidth="2"
          strokeDasharray="4,4"
          points={idealPoints}
        />

        {/* 实际燃尽线 */}
        <polyline
          fill="none"
          stroke="#36A2EB"
          strokeWidth="2"
          points={points}
        />

        {/* 数据点 */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={padding + i * xScale}
            cy={chartHeight - padding - d.remaining * yScale}
            r="4"
            fill="#36A2EB"
          />
        ))}
      </svg>
      <div className="flex justify-center mt-2 text-sm">
        <span className="flex items-center mr-4"><span className="w-3 h-3 bg-blue-400 mr-1"></span> 实际燃尽</span>
        <span className="flex items-center"><span className="w-3 h-3 bg-red-400 mr-1"></span> 理想燃尽</span>
      </div>
    </div>
  );
} 