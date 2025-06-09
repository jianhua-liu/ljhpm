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
import { Separator } from "@/components/ui/separator"
import { Bot, Sparkles, Calendar, Target, Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface GeneratedPlan {
  projectName: string
  duration: string
  phases: {
    name: string
    duration: string
    tasks: string[]
    deliverables: string[]
    resources: string[]
  }[]
  milestones: {
    name: string
    date: string
    description: string
  }[]
  risks: {
    risk: string
    mitigation: string
  }[]
  recommendations: string[]
}

export default function ProjectPlanGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    scope: "",
    duration: "",
    budget: "",
    teamSize: "",
    methodology: "",
    requirements: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)

    // 模拟AI生成过程
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 模拟生成的项目计划
    const mockPlan: GeneratedPlan = {
      projectName: formData.projectName || "AI驱动的电商平台",
      duration: "16周",
      phases: [
        {
          name: "项目启动阶段",
          duration: "2周",
          tasks: ["项目章程制定", "团队组建", "干系人识别", "初步需求收集", "项目环境搭建"],
          deliverables: ["项目章程文档", "团队角色分配表", "干系人登记册", "项目环境配置"],
          resources: ["项目经理", "业务分析师", "技术架构师"],
        },
        {
          name: "需求分析阶段",
          duration: "3周",
          tasks: ["业务需求分析", "功能需求定义", "非功能需求确定", "用户故事编写", "原型设计"],
          deliverables: ["需求规格说明书", "用户故事集", "系统原型", "接口设计文档"],
          resources: ["业务分析师", "UI/UX设计师", "产品经理"],
        },
        {
          name: "系统设计阶段",
          duration: "3周",
          tasks: ["系统架构设计", "数据库设计", "API设计", "安全方案设计", "技术选型"],
          deliverables: ["系统架构文档", "数据库设计文档", "API规范文档", "安全设计方案"],
          resources: ["技术架构师", "数据库设计师", "安全专家"],
        },
        {
          name: "开发实施阶段",
          duration: "6周",
          tasks: ["前端开发", "后端开发", "数据库实现", "第三方集成", "单元测试"],
          deliverables: ["前端应用", "后端服务", "数据库实例", "集成接口", "测试报告"],
          resources: ["前端开发工程师", "后端开发工程师", "测试工程师"],
        },
        {
          name: "测试验收阶段",
          duration: "2周",
          tasks: ["系统测试", "用户验收测试", "性能测试", "安全测试", "缺陷修复"],
          deliverables: ["测试报告", "验收报告", "性能测试报告", "安全测试报告"],
          resources: ["测试工程师", "业务用户", "安全测试专家"],
        },
      ],
      milestones: [
        {
          name: "项目启动完成",
          date: "2024-01-15",
          description: "项目团队组建完成，项目章程获得批准",
        },
        {
          name: "需求确认完成",
          date: "2024-02-05",
          description: "所有需求文档完成并获得干系人确认",
        },
        {
          name: "系统设计完成",
          date: "2024-02-26",
          description: "系统架构和详细设计文档完成",
        },
        {
          name: "开发阶段完成",
          date: "2024-04-08",
          description: "所有功能开发完成，准备进入测试阶段",
        },
        {
          name: "项目交付",
          date: "2024-04-22",
          description: "系统通过验收测试，正式交付上线",
        },
      ],
      risks: [
        {
          risk: "关键技术人员离职",
          mitigation: "建立知识文档，实施交叉培训，提供竞争性薪酬",
        },
        {
          risk: "需求变更频繁",
          mitigation: "建立变更控制流程，定期需求评审会议",
        },
        {
          risk: "第三方服务不稳定",
          mitigation: "准备备用方案，实施服务监控和告警",
        },
        {
          risk: "预算超支",
          mitigation: "严格成本控制，定期预算审查和报告",
        },
      ],
      recommendations: [
        "建议采用敏捷开发方法，每2周进行一次迭代评审",
        "建立每日站会制度，确保团队沟通顺畅",
        "实施持续集成和持续部署，提高开发效率",
        "定期进行风险评估和干系人沟通",
        "建立项目知识库，确保知识传承",
      ],
    }

    setGeneratedPlan(mockPlan)
    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI项目计划生成器
          </h2>
          <p className="text-muted-foreground">输入项目信息，AI将为您生成完整的项目计划</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 输入表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              项目信息输入
            </CardTitle>
            <CardDescription>请填写项目的基本信息，AI将基于这些信息生成详细的项目计划</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">项目名称</Label>
                <Input
                  id="projectName"
                  placeholder="输入项目名称"
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
                    <SelectItem value="data">数据分析项目</SelectItem>
                    <SelectItem value="ai">AI/机器学习项目</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">预算范围</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择预算范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">10万以下</SelectItem>
                    <SelectItem value="medium">10-50万</SelectItem>
                    <SelectItem value="large">50-100万</SelectItem>
                    <SelectItem value="enterprise">100万以上</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="methodology">项目方法论</Label>
                <Select
                  value={formData.methodology}
                  onValueChange={(value) => setFormData({ ...formData, methodology: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择方法论" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agile">敏捷开发</SelectItem>
                    <SelectItem value="waterfall">瀑布模型</SelectItem>
                    <SelectItem value="hybrid">混合模式</SelectItem>
                    <SelectItem value="lean">精益开发</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">项目范围</Label>
              <Textarea
                id="scope"
                placeholder="描述项目的主要功能和范围..."
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">特殊需求</Label>
              <Textarea
                id="requirements"
                placeholder="描述项目的特殊需求、约束条件或技术要求..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
              />
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating || !formData.projectName} className="w-full">
              {isGenerating ? (
                <>
                  <Bot className="h-4 w-4 mr-2 animate-spin" />
                  AI正在生成项目计划...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  生成项目计划
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
                    <h3 className="font-medium">AI正在分析您的项目信息</h3>
                    <p className="text-sm text-muted-foreground">正在生成详细的项目计划...</p>
                  </div>
                  <Progress value={66} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {generatedPlan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  生成的项目计划
                </CardTitle>
                <CardDescription>基于您的输入，AI为 "{generatedPlan.projectName}" 生成了以下项目计划</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 项目概览 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">总工期: {generatedPlan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">阶段数: {generatedPlan.phases.length}个</span>
                  </div>
                </div>

                <Separator />

                {/* 项目阶段 */}
                <div>
                  <h4 className="font-medium mb-3">项目阶段</h4>
                  <div className="space-y-3">
                    {generatedPlan.phases.map((phase, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{phase.name}</h5>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="font-medium text-muted-foreground mb-1">主要任务:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {phase.tasks.slice(0, 3).map((task, i) => (
                                <li key={i}>{task}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground mb-1">交付物:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {phase.deliverables.slice(0, 3).map((deliverable, i) => (
                                <li key={i}>{deliverable}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 关键里程碑 */}
                <div>
                  <h4 className="font-medium mb-3">关键里程碑</h4>
                  <div className="space-y-2">
                    {generatedPlan.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 border rounded">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{milestone.name}</p>
                          <p className="text-xs text-muted-foreground">{milestone.description}</p>
                        </div>
                        <Badge variant="secondary">{milestone.date}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 风险识别 */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    主要风险
                  </h4>
                  <div className="space-y-2">
                    {generatedPlan.risks.map((risk, index) => (
                      <div key={index} className="border rounded p-3">
                        <p className="font-medium text-sm text-red-700">{risk.risk}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>缓解措施:</strong> {risk.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* AI建议 */}
                <div>
                  <h4 className="font-medium mb-3">AI建议</h4>
                  <ul className="space-y-2">
                    {generatedPlan.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    导出计划
                  </Button>
                  <Button className="flex-1">应用到项目</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
