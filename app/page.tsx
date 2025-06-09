"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  AlertTriangle,
  Users,
  MessageSquare,
  CheckCircle,
  RotateCcw,
  GitBranch,
  TrendingDown,
  Kanban,
  Target,
  Bot,
  Sparkles,
} from "lucide-react"
import GanttGenerator from "@/components/gantt-generator"
import RiskGenerator from "@/components/risk-generator"
import StakeholderGenerator from "@/components/stakeholder-generator"
import CommunicationGenerator from "@/components/communication-generator"
import ComingSoonPlaceholder from "@/components/coming-soon-placeholder"
// 注释掉未实现的组件导入
// import QualityGenerator from "@/components/quality-generator"
// import SprintGenerator from "@/components/sprint-generator"
import ReleaseGenerator from "@/components/release-generator"
import BurndownGenerator from "@/components/burndown-generator"
// import KanbanGenerator from "@/components/kanban-generator"

interface Tool {
  id: string
  title: string
  description: string
  icon: any
  category: "traditional" | "agile"
  color: string
  features: string[]
}

const tools: Tool[] = [
  // 传统项目管理工具
  {
    id: "gantt",
    title: "项目计划甘特图",
    description: "基于项目需求和时间约束，AI智能生成详细的项目甘特图",
    icon: Calendar,
    category: "traditional",
    color: "bg-blue-500",
    features: ["任务分解", "时间规划", "依赖关系", "资源分配"],
  },
  {
    id: "risk",
    title: "项目风险管理",
    description: "识别项目风险因素，生成风险评估矩阵和应对策略",
    icon: AlertTriangle,
    category: "traditional",
    color: "bg-red-500",
    features: ["风险识别", "概率评估", "影响分析", "应对措施"],
  },
  {
    id: "stakeholder",
    title: "干系人管理",
    description: "分析项目干系人，生成影响力矩阵和沟通策略",
    icon: Users,
    category: "traditional",
    color: "bg-green-500",
    features: ["干系人识别", "影响力分析", "沟通策略", "参与度管理"],
  },
  {
    id: "communication",
    title: "沟通管理",
    description: "制定项目沟通计划，优化信息传递效率",
    icon: MessageSquare,
    category: "traditional",
    color: "bg-purple-500",
    features: ["沟通计划", "会议安排", "报告机制", "信息分发"],
  },
  {
    id: "quality",
    title: "质量管理",
    description: "建立质量标准和检查点，确保项目交付质量",
    icon: CheckCircle,
    category: "traditional",
    color: "bg-orange-500",
    features: ["质量标准", "检查清单", "测试计划", "质量指标"],
  },

  // 敏捷精益工具
  {
    id: "sprint",
    title: "迭代计划",
    description: "规划敏捷开发迭代，分配用户故事和任务",
    icon: RotateCcw,
    category: "agile",
    color: "bg-cyan-500",
    features: ["Sprint规划", "用户故事", "任务分配", "速度估算"],
  },
  {
    id: "release",
    title: "版本计划",
    description: "制定产品发布路线图和版本规划",
    icon: GitBranch,
    category: "agile",
    color: "bg-indigo-500",
    features: ["发布计划", "功能路线图", "版本管理", "里程碑"],
  },
  {
    id: "burndown",
    title: "燃尽图",
    description: "跟踪迭代进度，可视化剩余工作量趋势",
    icon: TrendingDown,
    category: "agile",
    color: "bg-pink-500",
    features: ["进度跟踪", "工作量分析", "趋势预测", "团队速度"],
  },
  {
    id: "kanban",
    title: "看板管理",
    description: "可视化工作流程，优化任务流转效率",
    icon: Kanban,
    category: "agile",
    color: "bg-teal-500",
    features: ["工作流可视化", "WIP限制", "流程优化", "瓶颈识别"],
  },
]

export default function ProjectManagementHome() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<"all" | "traditional" | "agile">("all")

  const filteredTools = tools.filter((tool) => activeCategory === "all" || tool.category === activeCategory)

  const renderToolComponent = () => {
    switch (selectedTool) {
      case "gantt":
        return <GanttGenerator onBack={() => setSelectedTool(null)} />
      case "risk":
        return <RiskGenerator onBack={() => setSelectedTool(null)} />
      case "stakeholder":
        return <StakeholderGenerator onBack={() => setSelectedTool(null)} />
      case "communication":
        return <CommunicationGenerator onBack={() => setSelectedTool(null)} />
      // 注释掉未实现的组件渲染
      case "quality":
        // return <QualityGenerator onBack={() => setSelectedTool(null)} />
        return <ComingSoonPlaceholder tool="质量管理" onBack={() => setSelectedTool(null)} />
      case "sprint":
        // return <SprintGenerator onBack={() => setSelectedTool(null)} />
        return <ComingSoonPlaceholder tool="迭代计划" onBack={() => setSelectedTool(null)} />
      case "release":
        return <ReleaseGenerator onBack={() => setSelectedTool(null)} />
      case "burndown":
        return <BurndownGenerator onBack={() => setSelectedTool(null)} />
      case "kanban":
        // return <KanbanGenerator onBack={() => setSelectedTool(null)} />
        return <ComingSoonPlaceholder tool="看板管理" onBack={() => setSelectedTool(null)} />
      default:
        return null
    }
  }

  if (selectedTool) {
    return renderToolComponent()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI项目管理工具箱
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              选择适合的项目管理工具，输入场景信息，AI将为您一键生成专业的项目管理图表和计划
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4" />
              <span>由AI驱动的智能项目管理平台</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 分类筛选 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 p-1 bg-white rounded-lg border shadow-sm">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              全部工具
            </Button>
            <Button
              variant={activeCategory === "traditional" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("traditional")}
            >
              传统项目管理
            </Button>
            <Button
              variant={activeCategory === "agile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory("agile")}
            >
              敏捷精益
            </Button>
          </div>
        </div>

        {/* 工具网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105 flex flex-col h-full"
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${tool.color} text-white group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={tool.category === "traditional" ? "default" : "secondary"} className="text-xs">
                    {tool.category === "traditional" ? "传统" : "敏捷"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    <Bot className="h-4 w-4 mr-2" />
                    AI智能生成
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">AI智能生成说明</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                每个工具都配备了AI智能分析功能。您只需要输入项目的基本信息和场景描述，
                AI将自动分析并生成相应的项目管理图表、计划和建议，大大提升您的工作效率。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
