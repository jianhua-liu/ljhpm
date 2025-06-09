"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Bot, Calendar, Clock, User, Sparkles } from "lucide-react"
import ColorfulGanttChart, { ColorfulGanttTask } from "@/components/ColorfulGanttChart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface GanttTask {
  id: string
  name: string
  startDate: string
  endDate: string
  duration: number
  progress: number
  assignee: string
  dependencies: string[]
  phase: string
}

interface GeneratedGantt {
  projectName: string
  totalDuration: string
  phases: string[]
  tasks: GanttTask[]
  criticalPath: string[]
  recommendations: string[]
}

interface GanttGeneratorProps {
  onBack: () => void
}

export default function GanttGenerator({ onBack }: GanttGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedGantt, setGeneratedGantt] = useState<GeneratedGantt | null>(null)
  const [formData, setFormData] = useState({
    projectName: "服务商品开发",
    projectType: "research",
    scope: "实现商品ABC的直销",
    duration: "8",
    teamSize: "large",
    complexity: "low",
    constraints: "",
    deliverables: "",
  })
  const [activeTab, setActiveTab] = useState("preview")
  const [editableTasks, setEditableTasks] = useState<GanttTask[]>([])

  const handleGenerate = async () => {
    setIsGenerating(true)

    // 模拟AI生成过程
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 模拟生成的甘特图数据
    const mockGantt: GeneratedGantt = {
      projectName: formData.projectName || "AI驱动的电商平台开发",
      totalDuration: "16周",
      phases: ["项目启动", "需求分析", "系统设计", "开发实施", "测试验收", "部署上线"],
      tasks: [
        {
          id: "1",
          name: "项目启动会议",
          startDate: "2024-01-08",
          endDate: "2024-01-09",
          duration: 2,
          progress: 100,
          assignee: "项目经理",
          dependencies: [],
          phase: "项目启动",
        },
        {
          id: "2",
          name: "需求收集与分析",
          startDate: "2024-01-10",
          endDate: "2024-01-19",
          duration: 10,
          progress: 75,
          assignee: "业务分析师",
          dependencies: ["1"],
          phase: "需求分析",
        },
        {
          id: "3",
          name: "系统架构设计",
          startDate: "2024-01-22",
          endDate: "2024-02-02",
          duration: 12,
          progress: 50,
          assignee: "架构师",
          dependencies: ["2"],
          phase: "系统设计",
        },
        {
          id: "4",
          name: "数据库设计",
          startDate: "2024-01-29",
          endDate: "2024-02-09",
          duration: 12,
          progress: 30,
          assignee: "数据库工程师",
          dependencies: ["2"],
          phase: "系统设计",
        },
        {
          id: "5",
          name: "前端开发",
          startDate: "2024-02-12",
          endDate: "2024-03-08",
          duration: 25,
          progress: 0,
          assignee: "前端团队",
          dependencies: ["3"],
          phase: "开发实施",
        },
        {
          id: "6",
          name: "后端开发",
          startDate: "2024-02-12",
          endDate: "2024-03-15",
          duration: 32,
          progress: 0,
          assignee: "后端团队",
          dependencies: ["3", "4"],
          phase: "开发实施",
        },
        {
          id: "7",
          name: "集成测试",
          startDate: "2024-03-18",
          endDate: "2024-03-29",
          duration: 12,
          progress: 0,
          assignee: "测试团队",
          dependencies: ["5", "6"],
          phase: "测试验收",
        },
        {
          id: "8",
          name: "用户验收测试",
          startDate: "2024-04-01",
          endDate: "2024-04-12",
          duration: 12,
          progress: 0,
          assignee: "业务用户",
          dependencies: ["7"],
          phase: "测试验收",
        },
        {
          id: "9",
          name: "生产部署",
          startDate: "2024-04-15",
          endDate: "2024-04-19",
          duration: 5,
          progress: 0,
          assignee: "运维团队",
          dependencies: ["8"],
          phase: "部署上线",
        },
      ],
      criticalPath: ["1", "2", "3", "6", "7", "8", "9"],
      recommendations: [
        "关键路径上的任务需要重点关注，任何延期都会影响整体进度",
        "前端和后端开发可以并行进行，建议加强团队间的沟通协调",
        "建议在开发阶段引入持续集成，提前发现和解决问题",
        "用户验收测试阶段建议提前准备测试数据和环境",
        "部署阶段建议制定详细的回滚计划",
      ],
    }

    setGeneratedGantt(mockGantt)
    setIsGenerating(false)
  }

  const getPhaseColor = (phase: string) => {
    const colors = {
      项目启动: "bg-blue-500",
      需求分析: "bg-green-500",
      系统设计: "bg-purple-500",
      开发实施: "bg-orange-500",
      测试验收: "bg-red-500",
      部署上线: "bg-gray-500",
    }
    return colors[phase as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回工具箱
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI项目计划甘特图生成器</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="preview">预览甘特图</TabsTrigger>
            <TabsTrigger value="edit">编辑甘特图</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 输入表单 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    项目信息输入
                  </CardTitle>
                  <CardDescription>请详细描述您的项目信息，AI将基于这些信息生成专业的甘特图</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">项目名称 *</Label>
                      <Input
                        id="projectName"
                        placeholder="例：电商平台开发"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">项目类型</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择项目类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web应用开发</SelectItem>
                          <SelectItem value="mobile">移动应用开发</SelectItem>
                          <SelectItem value="system">系统集成</SelectItem>
                          <SelectItem value="infrastructure">基础设施</SelectItem>
                          <SelectItem value="research">研发项目</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">预期工期</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => setFormData({ ...formData, duration: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择工期" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4周</SelectItem>
                          <SelectItem value="8">8周</SelectItem>
                          <SelectItem value="12">12周</SelectItem>
                          <SelectItem value="16">16周</SelectItem>
                          <SelectItem value="24">24周</SelectItem>
                          <SelectItem value="52">1年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">团队规模</Label>
                      <Select
                        value={formData.teamSize}
                        onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择团队规模" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">3-5人</SelectItem>
                          <SelectItem value="medium">6-10人</SelectItem>
                          <SelectItem value="large">11-20人</SelectItem>
                          <SelectItem value="enterprise">20人以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complexity">项目复杂度</Label>
                    <Select
                      value={formData.complexity}
                      onValueChange={(value) => setFormData({ ...formData, complexity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="评估项目复杂度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低 - 简单项目，技术成熟</SelectItem>
                        <SelectItem value="medium">中 - 中等复杂度，部分新技术</SelectItem>
                        <SelectItem value="high">高 - 复杂项目，创新技术</SelectItem>
                        <SelectItem value="very-high">极高 - 前沿技术，高风险</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scope">项目范围描述 *</Label>
                    <Textarea
                      id="scope"
                      placeholder="详细描述项目的主要功能、目标和范围..."
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliverables">主要交付物</Label>
                    <Textarea
                      id="deliverables"
                      placeholder="列出项目的主要交付物和里程碑..."
                      value={formData.deliverables}
                      onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="constraints">约束条件</Label>
                    <Textarea
                      id="constraints"
                      placeholder="描述时间、预算、资源等约束条件..."
                      value={formData.constraints}
                      onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.projectName || !formData.scope}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-spin" />
                        AI正在生成甘特图...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        生成项目甘特图
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* 生成结果 */}
              <div className="space-y-6">
                {isGenerating && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Bot className="h-12 w-12 mx-auto text-primary animate-pulse" />
                        <div>
                          <h3 className="font-medium">AI正在分析项目信息</h3>
                          <p className="text-sm text-muted-foreground">正在生成项目甘特图和时间规划...</p>
                        </div>
                        <Progress value={75} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {generatedGantt && (
                  <div className="space-y-6">
                    {/* 项目概览 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          {generatedGantt.projectName}
                        </CardTitle>
                        <CardDescription>AI生成的项目甘特图 - 总工期：{generatedGantt.totalDuration}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">总工期: {generatedGantt.totalDuration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">任务数: {generatedGantt.tasks.length}个</span>
                          </div>
                        </div>

                        {/* 彩色甘特图可视化 */}
                        <div className="my-6">
                          <ColorfulGanttChart
                            tasks={generatedGantt.tasks.map((task, idx) => {
                              const phaseColors: Record<string, string> = {
                                "项目启动": "#FFD600",
                                "需求分析": "#00C9A7",
                                "系统设计": "#A259F7",
                                "开发实施": "#3B5BDB",
                                "测试验收": "#FF4D4F",
                                "部署上线": "#FF5CA7",
                              };
                              const getMonth = (dateStr: string) => {
                                const d = new Date(dateStr);
                                return d.getMonth() + 1;
                              };
                              return {
                                name: task.name,
                                color: phaseColors[task.phase] || ["#FFD600", "#00C9A7", "#A259F7", "#3B5BDB", "#FF4D4F", "#FF5CA7"][idx % 6],
                                startMonth: getMonth(task.startDate),
                                endMonth: getMonth(task.endDate),
                                progress: task.progress,
                              } as ColorfulGanttTask;
                            })}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI建议 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          AI分析建议
                        </CardTitle>
                        <CardDescription>基于项目特点的专业建议</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {generatedGantt.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        导出甘特图
                      </Button>
                      <Button className="flex-1">应用到项目</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div className="max-w-3xl mx-auto">
              {/* 简单任务编辑表格 */}
              <Card>
                <CardHeader>
                  <CardTitle>编辑任务</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th>任务名</th>
                        <th>开始日期</th>
                        <th>结束日期</th>
                        <th>进度(%)</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(generatedGantt?.tasks || []).map((task, idx) => (
                        <tr key={task.id}>
                          <td>
                            <Input
                              value={task.name}
                              onChange={e => {
                                const newTasks = [...(generatedGantt?.tasks || [])];
                                newTasks[idx].name = e.target.value;
                                setGeneratedGantt({ ...generatedGantt!, tasks: newTasks });
                              }}
                              className="w-32"
                            />
                          </td>
                          <td>
                            <Input
                              value={task.startDate}
                              onChange={e => {
                                const newTasks = [...(generatedGantt?.tasks || [])];
                                newTasks[idx].startDate = e.target.value;
                                setGeneratedGantt({ ...generatedGantt!, tasks: newTasks });
                              }}
                              className="w-32"
                            />
                          </td>
                          <td>
                            <Input
                              value={task.endDate}
                              onChange={e => {
                                const newTasks = [...(generatedGantt?.tasks || [])];
                                newTasks[idx].endDate = e.target.value;
                                setGeneratedGantt({ ...generatedGantt!, tasks: newTasks });
                              }}
                              className="w-32"
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={task.progress}
                              onChange={e => {
                                const newTasks = [...(generatedGantt?.tasks || [])];
                                newTasks[idx].progress = Number(e.target.value);
                                setGeneratedGantt({ ...generatedGantt!, tasks: newTasks });
                              }}
                              className="w-16"
                            />
                          </td>
                          <td>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const newTasks = [...(generatedGantt?.tasks || [])];
                                newTasks.splice(idx, 1);
                                setGeneratedGantt({ ...generatedGantt!, tasks: newTasks });
                              }}
                            >删除</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      if (generatedGantt) {
                        setGeneratedGantt({
                          ...generatedGantt,
                          tasks: [
                            ...generatedGantt.tasks,
                            {
                              id: Date.now().toString(),
                              name: "新任务",
                              startDate: "2024-01-01",
                              endDate: "2024-01-02",
                              duration: 1,
                              progress: 0,
                              assignee: "",
                              dependencies: [],
                              phase: "开发实施",
                            },
                          ],
                        });
                      }
                    }}
                  >新增任务</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
