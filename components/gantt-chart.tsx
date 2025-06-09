"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Clock, User } from "lucide-react"

interface Task {
  id: string
  name: string
  startDate: string
  endDate: string
  progress: number
  assignee: string
  status: "not-started" | "in-progress" | "completed" | "delayed"
  dependencies?: string[]
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "项目启动",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    progress: 100,
    assignee: "张三",
    status: "completed",
  },
  {
    id: "2",
    name: "需求分析",
    startDate: "2024-01-06",
    endDate: "2024-01-15",
    progress: 80,
    assignee: "李四",
    status: "in-progress",
  },
  {
    id: "3",
    name: "系统设计",
    startDate: "2024-01-16",
    endDate: "2024-01-25",
    progress: 30,
    assignee: "王五",
    status: "in-progress",
  },
  {
    id: "4",
    name: "前端开发",
    startDate: "2024-01-26",
    endDate: "2024-02-15",
    progress: 0,
    assignee: "赵六",
    status: "not-started",
  },
  {
    id: "5",
    name: "后端开发",
    startDate: "2024-01-26",
    endDate: "2024-02-20",
    progress: 0,
    assignee: "钱七",
    status: "not-started",
  },
  {
    id: "6",
    name: "测试阶段",
    startDate: "2024-02-21",
    endDate: "2024-03-05",
    progress: 0,
    assignee: "孙八",
    status: "not-started",
  },
]

const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "in-progress":
      return "bg-blue-500"
    case "delayed":
      return "bg-red-500"
    default:
      return "bg-gray-300"
  }
}

const getStatusBadge = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">已完成</Badge>
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-800">进行中</Badge>
    case "delayed":
      return <Badge variant="destructive">延期</Badge>
    default:
      return <Badge variant="secondary">未开始</Badge>
  }
}

export default function GanttChart() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">甘特图</h2>
          <p className="text-muted-foreground">项目时间线和任务进度可视化</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          添加任务
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>项目时间线</CardTitle>
          <CardDescription>电商平台重构项目 - 2024年Q1</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 时间轴头部 */}
            <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground border-b pb-2">
              <div className="col-span-3">任务名称</div>
              <div className="col-span-2">负责人</div>
              <div className="col-span-2">开始日期</div>
              <div className="col-span-2">结束日期</div>
              <div className="col-span-2">进度</div>
              <div className="col-span-1">状态</div>
            </div>

            {/* 任务列表 */}
            {tasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-2 items-center py-3 border-b last:border-b-0">
                <div className="col-span-3">
                  <p className="font-medium text-sm">{task.name}</p>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{task.assignee}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{task.startDate}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{task.endDate}</span>
                </div>
                <div className="col-span-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                </div>
                <div className="col-span-1">{getStatusBadge(task.status)}</div>
              </div>
            ))}
          </div>

          {/* 甘特图可视化区域 */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-4">时间线可视化</h4>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm truncate">{task.name}</div>
                  <div className="flex-1 relative h-6 bg-gray-100 rounded">
                    <div
                      className={`absolute left-0 top-0 h-full rounded ${getStatusColor(task.status)}`}
                      style={{ width: `${task.progress}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                      {task.progress > 20 ? `${task.progress}%` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
