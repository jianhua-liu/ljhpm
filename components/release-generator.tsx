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
import { ArrowLeft, Bot, GitBranch, Sparkles, Calendar, Target, Plus, Trash2, AlertTriangle } from "lucide-react"

interface Requirement {
  id: string
  name: string
  description: string
  priority: "critical" | "high" | "medium" | "low"
  effort: number // 工作量（人天）
  category: string
  dependencies: string[]
}

interface ReleaseVersion {
  id: string
  name: string
  version: string
  releaseDate: string
  features: string[]
  requirements: Requirement[]
  totalEffort: number
  riskLevel: "low" | "medium" | "high"
  status: "planned" | "in-progress" | "testing" | "released"
}

interface GeneratedReleasePlan {
  projectName: string
  totalVersions: number
  totalRequirements: number
  timeline: string
  versions: ReleaseVersion[]
  roadmap: {
    quarter: string
    versions: string[]
    focus: string
  }[]
  recommendations: string[]
  risks: {
    risk: string
    impact: string
    mitigation: string
  }[]
}

interface ReleaseGeneratorProps {
  onBack: () => void
}

export default function ReleaseGenerator({ onBack }: ReleaseGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedReleasePlan | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      name: "用户注册登录",
      description: "实现用户注册、登录、密码重置功能",
      priority: "critical",
      effort: 8,
      category: "用户管理",
      dependencies: [],
    },
  ])
  const [formData, setFormData] = useState({
    projectName: "",
    releaseType: "",
    cycleDuration: "",
    teamSize: "",
    methodology: "",
    totalVersions: "",
    startDate: "",
    projectGoals: "",
  })

  const addRequirement = () => {
    const newRequirement: Requirement = {
      id: Date.now().toString(),
      name: "",
      description: "",
      priority: "medium",
      effort: 5,
      category: "",
      dependencies: [],
    }
    setRequirements([...requirements, newRequirement])
  }

  const updateRequirement = (id: string, field: keyof Requirement, value: any) => {
    setRequirements(requirements.map((req) => (req.id === id ? { ...req, [field]: value } : req)))
  }

  const removeRequirement = (id: string) => {
    setRequirements(requirements.filter((req) => req.id !== id))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 模拟AI生成版本计划
    const mockPlan: GeneratedReleasePlan = {
      projectName: formData.projectName || "AI驱动的电商平台",
      totalVersions: Number.parseInt(formData.totalVersions) || 4,
      totalRequirements: requirements.length,
      timeline: "12个月",
      versions: [
        {
          id: "v1",
          name: "MVP版本",
          version: "v1.0.0",
          releaseDate: "2024-03-15",
          features: ["用户注册登录", "基础商品展示", "购物车功能"],
          requirements: requirements.filter((r) => r.priority === "critical").slice(0, 3),
          totalEffort: 45,
          riskLevel: "medium",
          status: "planned",
        },
        {
          id: "v2",
          name: "核心功能版本",
          version: "v1.1.0",
          releaseDate: "2024-06-15",
          features: ["支付系统", "订单管理", "用户中心"],
          requirements: requirements.filter((r) => r.priority === "high").slice(0, 4),
          totalEffort: 65,
          riskLevel: "high",
          status: "planned",
        },
        {
          id: "v3",
          name: "增强功能版本",
          version: "v1.2.0",
          releaseDate: "2024-09-15",
          features: ["推荐系统", "评价系统", "优惠券"],
          requirements: requirements.filter((r) => r.priority === "medium").slice(0, 5),
          totalEffort: 55,
          riskLevel: "medium",
          status: "planned",
        },
        {
          id: "v4",
          name: "完整功能版本",
          version: "v2.0.0",
          releaseDate: "2024-12-15",
          features: ["数据分析", "移动端适配", "API开放"],
          requirements: requirements.filter((r) => r.priority === "low").slice(0, 3),
          totalEffort: 40,
          riskLevel: "low",
          status: "planned",
        },
      ],
      roadmap: [
        {
          quarter: "2024 Q1",
          versions: ["v1.0.0"],
          focus: "MVP上线，验证核心商业模式",
        },
        {
          quarter: "2024 Q2",
          versions: ["v1.1.0"],
          focus: "完善核心功能，提升用户体验",
        },
        {
          quarter: "2024 Q3",
          versions: ["v1.2.0"],
          focus: "增强功能，扩大用户规模",
        },
        {
          quarter: "2024 Q4",
          versions: ["v2.0.0"],
          focus: "平台化发展，开放生态",
        },
      ],
      recommendations: [
        "建议采用敏捷开发模式，每个版本包含2-3个Sprint",
        "优先实现高价值、低风险的功能，快速获得用户反馈",
        "建立持续集成和持续部署流程，提高发布效率",
        "每个版本发布前进行充分的用户验收测试",
        "建立版本回滚机制，确保系统稳定性",
        "定期收集用户反馈，调整后续版本计划",
      ],
      risks: [
        {
          risk: "关键功能开发延期",
          impact: "可能导致版本发布推迟，影响市场竞争力",
          mitigation: "增加缓冲时间，准备备选方案，加强进度监控",
        },
        {
          risk: "第三方服务依赖风险",
          impact: "支付、物流等服务不稳定可能影响用户体验",
          mitigation: "选择多个服务提供商，建立备用方案",
        },
        {
          risk: "团队资源不足",
          impact: "开发进度可能受到影响",
          mitigation: "提前规划人力资源，考虑外包或临时增援",
        },
      ],
    }

    setGeneratedPlan(mockPlan)
    setIsGenerating(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "released":
        return "bg-green-100 text-green-800"
      case "testing":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <GitBranch className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI版本计划生成器</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 输入表单 */}
          <div className="space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  项目基本信息
                </CardTitle>
                <CardDescription>请填写项目的基本信息和版本规划参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">项目名称 *</Label>
                    <Input
                      id="projectName"
                      placeholder="例：电商平台"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="releaseType">发布类型</Label>
                    <Select
                      value={formData.releaseType}
                      onValueChange={(value) => setFormData({ ...formData, releaseType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择发布类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="major">大版本发布</SelectItem>
                        <SelectItem value="minor">小版本发布</SelectItem>
                        <SelectItem value="patch">补丁版本</SelectItem>
                        <SelectItem value="continuous">持续发布</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cycleDuration">版本周期</Label>
                    <Select
                      value={formData.cycleDuration}
                      onValueChange={(value) => setFormData({ ...formData, cycleDuration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择版本周期" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2weeks">2周</SelectItem>
                        <SelectItem value="1month">1个月</SelectItem>
                        <SelectItem value="2months">2个月</SelectItem>
                        <SelectItem value="3months">3个月</SelectItem>
                        <SelectItem value="6months">6个月</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalVersions">计划版本数</Label>
                    <Input
                      id="totalVersions"
                      type="number"
                      placeholder="例：4"
                      value={formData.totalVersions}
                      onChange={(e) => setFormData({ ...formData, totalVersions: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="methodology">开发方法论</Label>
                    <Select
                      value={formData.methodology}
                      onValueChange={(value) => setFormData({ ...formData, methodology: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择开发方法" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scrum">Scrum</SelectItem>
                        <SelectItem value="kanban">Kanban</SelectItem>
                        <SelectItem value="lean">精益开发</SelectItem>
                        <SelectItem value="waterfall">瀑布模型</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectGoals">项目目标</Label>
                  <Textarea
                    id="projectGoals"
                    placeholder="描述项目的主要目标和成功标准..."
                    value={formData.projectGoals}
                    onChange={(e) => setFormData({ ...formData, projectGoals: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 需求清单 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>需求清单</span>
                  <Button onClick={addRequirement} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    添加需求
                  </Button>
                </CardTitle>
                <CardDescription>添加项目需求并设置优先级和工作量估算</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {requirements.map((req, index) => (
                    <div key={req.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">需求 #{index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRequirement(req.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>需求名称</Label>
                          <Input
                            placeholder="例：用户注册功能"
                            value={req.name}
                            onChange={(e) => updateRequirement(req.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>分类</Label>
                          <Input
                            placeholder="例：用户管理"
                            value={req.category}
                            onChange={(e) => updateRequirement(req.id, "category", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>需求描述</Label>
                        <Textarea
                          placeholder="详细描述需求内容..."
                          value={req.description}
                          onChange={(e) => updateRequirement(req.id, "description", e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>优先级</Label>
                          <Select
                            value={req.priority}
                            onValueChange={(value) => updateRequirement(req.id, "priority", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">关键</SelectItem>
                              <SelectItem value="high">高</SelectItem>
                              <SelectItem value="medium">中</SelectItem>
                              <SelectItem value="low">低</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>工作量（人天）</Label>
                          <Input
                            type="number"
                            value={req.effort}
                            onChange={(e) => updateRequirement(req.id, "effort", Number.parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !formData.projectName || requirements.length === 0}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Bot className="h-4 w-4 mr-2 animate-spin" />
                  AI正在生成版本计划...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  生成版本发布计划
                </>
              )}
            </Button>
          </div>

          {/* 生成结果 */}
          <div className="space-y-6">
            {isGenerating && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <GitBranch className="h-12 w-12 mx-auto text-primary animate-pulse" />
                    <div>
                      <h3 className="font-medium">AI正在分析需求优先级</h3>
                      <p className="text-sm text-muted-foreground">正在生成智能版本发布计划...</p>
                    </div>
                    <Progress value={60} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedPlan && (
              <div className="space-y-6">
                {/* 计划概览 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-blue-600" />
                      {generatedPlan.projectName} - 版本发布计划
                    </CardTitle>
                    <CardDescription>
                      计划发布 {generatedPlan.totalVersions} 个版本，包含 {generatedPlan.totalRequirements} 个需求
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{generatedPlan.totalVersions}</div>
                        <div className="text-sm text-muted-foreground">计划版本</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{generatedPlan.totalRequirements}</div>
                        <div className="text-sm text-muted-foreground">总需求数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{generatedPlan.timeline}</div>
                        <div className="text-sm text-muted-foreground">项目周期</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 版本路线图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      版本路线图
                    </CardTitle>
                    <CardDescription>按季度划分的版本发布计划</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedPlan.roadmap.map((quarter, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{quarter.quarter}</h4>
                            <div className="flex gap-2">
                              {quarter.versions.map((version, i) => (
                                <Badge key={i} variant="outline">
                                  {version}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{quarter.focus}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 版本详情 */}
                <Card>
                  <CardHeader>
                    <CardTitle>版本详细计划</CardTitle>
                    <CardDescription>每个版本的功能分配和时间安排</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {generatedPlan.versions.map((version) => (
                        <div key={version.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-medium text-lg">{version.name}</h4>
                              <p className="text-sm text-muted-foreground">{version.version}</p>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                              <Badge className={getStatusColor(version.status)}>
                                {version.status === "planned"
                                  ? "计划中"
                                  : version.status === "in-progress"
                                    ? "进行中"
                                    : version.status === "testing"
                                      ? "测试中"
                                      : "已发布"}
                              </Badge>
                              <Badge className={getRiskColor(version.riskLevel)}>
                                {version.riskLevel === "high"
                                  ? "高风险"
                                  : version.riskLevel === "medium"
                                    ? "中风险"
                                    : "低风险"}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sm mb-2">发布信息</h5>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>发布日期: {version.releaseDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Target className="h-3 w-3 text-muted-foreground" />
                                  <span>工作量: {version.totalEffort} 人天</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-2">主要功能</h5>
                              <div className="flex flex-wrap gap-1">
                                {version.features.map((feature, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {version.requirements.length > 0 && (
                            <div className="mt-4">
                              <h5 className="font-medium text-sm mb-2">包含需求</h5>
                              <div className="space-y-2">
                                {version.requirements.map((req) => (
                                  <div key={req.id} className="flex items-center justify-between text-sm">
                                    <span>{req.name}</span>
                                    <div className="flex items-center gap-2">
                                      <Badge className={getPriorityColor(req.priority)} variant="outline">
                                        {req.priority === "critical"
                                          ? "关键"
                                          : req.priority === "high"
                                            ? "高"
                                            : req.priority === "medium"
                                              ? "中"
                                              : "低"}
                                      </Badge>
                                      <span className="text-muted-foreground">{req.effort}天</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 风险评估 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      风险评估
                    </CardTitle>
                    <CardDescription>版本发布过程中的潜在风险和应对措施</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedPlan.risks.map((risk, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm text-red-700">{risk.risk}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            <strong>影响:</strong> {risk.impact}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <strong>缓解措施:</strong> {risk.mitigation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI建议 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      AI版本管理建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {generatedPlan.recommendations.map((recommendation, index) => (
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
                    导出版本计划
                  </Button>
                  <Button className="flex-1">应用到项目</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
