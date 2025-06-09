import React from "react";

export interface ColorfulGanttTask {
  name: string;
  color: string;
  startMonth: number; // 1-12
  endMonth: number;   // 1-12
  progress: number;   // 0-100
}

interface ColorfulGanttChartProps {
  tasks: ColorfulGanttTask[];
  months?: string[]; // 可选，默认Jan~Dec
}

const defaultMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const chartWidth = 1000;
const chartHeight = 350;
const leftPad = 100;
const topPad = 50;
const rowHeight = 40;
const barHeight = 18;
const monthWidth = (chartWidth - leftPad) / 12;
const now = new Date();
const currentMonth = now.getMonth(); // 0-based

export default function ColorfulGanttChart({ tasks, months = defaultMonths }: ColorfulGanttChartProps) {
  return (
    <svg width={chartWidth} height={chartHeight} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      {/* 顶部月份横轴 */}
      <g>
        {/* 当前月份三角 */}
        <polygon
          points={`${leftPad + monthWidth * currentMonth - 10},${topPad - 30} ${leftPad + monthWidth * currentMonth + 10},${topPad - 30} ${leftPad + monthWidth * currentMonth},${topPad - 10}`}
          fill="#FFD600"
        />
        {/* 月份文字 */}
        {months.map((m, i) => (
          <text
            key={m}
            x={leftPad + i * monthWidth + monthWidth / 2}
            y={topPad - 10}
            textAnchor="middle"
            fontSize={20}
            fontWeight={i === currentMonth ? 700 : 500}
            fill={i === currentMonth ? "#000" : "#222"}
          >
            {m}
          </text>
        ))}
        {/* 顶部横线 */}
        <rect x={leftPad} y={topPad - 5} width={monthWidth * 12} height={8} fill="#FF5CA7" rx={4} />
      </g>
      {/* 纵向虚线 */}
      <g>
        {months.map((_, i) => (
          <line
            key={i}
            x1={leftPad + i * monthWidth}
            y1={topPad}
            x2={leftPad + i * monthWidth}
            y2={chartHeight - 30}
            stroke="#BDBDBD"
            strokeDasharray="6,6"
            strokeWidth={1}
          />
        ))}
      </g>
      {/* 任务条 */}
      <g>
        {tasks.map((task, idx) => {
          const y = topPad + idx * rowHeight + 10;
          const x = leftPad + (task.startMonth - 1) * monthWidth;
          const barLen = (task.endMonth - task.startMonth + 1) * monthWidth;
          const progressLen = (barLen * task.progress) / 100;
          return (
            <g key={task.name}>
              {/* 任务名 */}
              <text x={leftPad - 10} y={y + barHeight / 2 + 4} textAnchor="end" fontSize={12} fill="#888" fontWeight={600} style={{maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {task.name.length > 8 ? task.name.slice(0,8) + '…' : task.name}
              </text>
              {/* 已完成部分 */}
              <rect x={x} y={y} width={progressLen} height={barHeight} fill={task.color} rx={6} />
              {/* 未完成部分 */}
              <rect x={x + progressLen} y={y} width={barLen - progressLen} height={barHeight} fill={task.color} opacity={0.3} rx={6} />
              {/* 进度百分比 */}
              <text x={x + barLen + 10} y={y + barHeight / 2 + 4} fontSize={16} fill="#888" fontWeight={700}>
                {task.progress}%
              </text>
            </g>
          );
        })}
      </g>
      {/* 底部横线 */}
      <rect x={leftPad} y={chartHeight - 20} width={monthWidth * 12} height={4} fill="#A259F7" rx={2} />
    </svg>
  );
} 