"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, MessageSquare, Sparkles, Calendar, FileText } from "lucide-react"

interface CommunicationPlan {
  id: string
  type: string
  frequency: string
  participants: string[]
  purpose: string
  format: string
  duration: string
  deliverables: string[]
  owner: string
}

interface GeneratedCommunication {
  projectName: string
  totalMeetings: number
  communicationChannels: number
  plans: CommunicationPlan[]
  escalationMatrix: {
    level: string
    trigger: string
    contact: string
    timeframe: string
  }[]
  templates: {
    name: string
    purpose: string
    frequency: string
  }[]
  recommendations: string[]
}

interface CommunicationGeneratorProps {
  onBack: () => void
}

export default function CommunicationGenerator({ onBack }: CommunicationGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedCommunication | null>(null)
  const [formData, setFormData] = useState({
    projectName: "",
    teamSize: "",
    projectType: "",
    duration: "",
    complexity: "",
    stakeholders: "",
    geography: "",
    methodology: "",
    challenges: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockPlan: GeneratedCommunication = {
      projectName: formData.projectName || "AI驱动的电商平台开发",
      totalMeetings: 8,
      communicationChannels: 6,
      plans: [
        {
          id: "1",
          type: "项目启动会议",
          frequency: "一次性",
          participants: ["项目经理", "技术负责人", "产品经理", "关键干系人"],
          purpose: "项目启动，团队介绍，目标对齐，角色分工",
          format: "面对面会议",
          duration: "2小时",
          deliverables: ["项目章程", "团队联系表", "沟通计划"],
          owner: "项目经理",
        },
        {
          id: "2",
          type: "每日站会",
          frequency: "每日",
          participants: ["开发团队", "Scrum Master", "产品负责人"],
          purpose: "同步进度，识别障碍，协调工作",
          format: "线上视频会议",
          duration: "15分钟",
          deliverables: ["进度更新", "障碍清单"],
          owner: "Scrum Master",
        },
        {
          id: "3",
          type: "周度进度会议",
          frequency: "每周",
          participants: ["项目经理", "各模块负责人", "质量经理"],
          purpose: "进度汇报，风险识别，问题解决",
          format: "混合会议",
          duration: "1小时",
          deliverables: ["周报", "风险登记册", "行动计划"],
          owner: "项目经理",
        },
        {
          id: "4",
          type: "干系人评审会",
          frequency: "双周",
          participants: ["项目发起人", "业务代表", "项目经理", "产品经理"],
          purpose: "成果展示，需求确认，决策支持",
          format: "面对面会议",
          duration: "1.5小时",
          deliverables: ["演示材料", "反馈记录", "决策文档"],
          owner: "产品经理",
        },
        {
          id: "5",
          type: "技术评审会",
          frequency: "双周",
          participants: ["技术团队", "架构师", "安全专家", "运维代表"],
          purpose: "技术方案评审，架构决策，技术风险评估",
          format: "线上会议",
          duration: "2小时",
          deliverables: ["技术文档", "评审意见", "改进建议"],
          owner: "技术负责人",
        },
        {
          id: "6",
          type: "月度管理层汇报",
          frequency: "每月",
          participants: ["高级管理层", "项目经理", "财务经理"],
          purpose: "项目状态汇报，预算审查，战略调整",
          format: "正式会议",
          duration: "1小时",
          deliverables: ["月度报告", "财务报表", "风险评估"],
          owner: "项目经理",
        },
        {
          id: "7",
          type: "质量评审会",
          frequency: "每月",
          participants: ["质量团队", "测试经理", "开发代表", "产品经理"],
          purpose: "质量指标评审，测试计划确认，缺陷分析",
          format: "线上会议",
          duration: "1.5小时",
          deliverables: ["质量报告", "测试计划", "改进措施"],
          owner: "质量经理",
        },
        {
          id: "8",
          type: "里程碑评审会",
          frequency: "按里程碑",
          participants: ["所有关键干系人", "项目团队", "外部专家"],
          purpose: "里程碑成果评审，下阶段规划，Go/No-Go决策",
          format: "正式评审",
          duration: "3小时",
          deliverables: ["评审报告", "决策记录", "下阶段计划"],
          owner: "项目经理",
        },
      ],
      escalationMatrix: [
        {
          level: "一级 - 团队内部",
          trigger: "日常问题，技术障碍",
          contact: "团队负责人",
          timeframe: "24小时内",
        },
        {
          level: "二级 - 项目管理",
          trigger: "进度延误，资源冲突",
          contact: "项目经理",
          timeframe: "48小时内",
        },
        {
          level: "三级 - 部门管理",
          trigger: "跨部门协调，预算问题",
          contact: "部门经理",
          timeframe: "72小时内",
        },
        {
          level: "四级 - 高级管理",
          trigger: "重大风险，战略变更",
          contact: "高级管理层",
          timeframe: "1周内",
        },
      ],
      templates: [
        {
          name: "项目状态报告",
          purpose: "定期汇报项目进展和关键指标",
          frequency: "每周",
        },
        {
          name: "风险评估报告",
          purpose: "识别和评估项目风险",
          frequency: "双周",
        },
        {
          name: "变更请求表",
          purpose: "正式提交和跟踪项目变更",
          frequency: "按需",
        },
        {
          name: "会议纪要模板",
          purpose: "记录会议讨论和决策",
          frequency: "每次会议",
        },
        {
          name: "干系人反馈表",
          purpose: "收集干系人意见和建议",
          frequency: "每月",
        },
      ],
      recommendations: [
        "建立统一的沟通平台，确保信息透明和可追溯",
        "制定明确的会议议程和时间管理规则",
        "建立有效的文档管理和版本控制机制",
        "定期评估沟通效果，优化沟通流程",
        "培训团队成员的沟通技能和工具使用",
        "建立紧急沟通机制，确保关键信息及时传达",
      ],
    }

    setGeneratedPlan(mockPlan)
    setIsGenerating(false)
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "每日":
        return "bg-red-100 text-red-800"
      case "每周":
        return "bg-orange-100 text-orange-800"
      case "双周":
        return "bg-yellow-100 text-yellow-800"
      case "每月":
        return "bg-green-100 text-green-800"
      case "按里程碑":
        return "bg-blue-100 text-blue-800"
      case "一次性":
        return "bg-purple-100 text-purple-800"
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
              <MessageSquare className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI沟通管理计划生成器</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 输入表单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                项目沟通需求分析
              </CardTitle>
              <CardDescription>请提供项目信息，AI将生成完整的沟通管理计划</CardDescription>
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
                  <Label htmlFor="teamSize">团队规模</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择团队规模" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">5人以下</SelectItem>
                      <SelectItem value="medium">5-15人</SelectItem>
                      <SelectItem value="large">15-30人</SelectItem>
                      <SelectItem value="enterprise">30人以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="software">软件开发</SelectItem>
                      <SelectItem value="infrastructure">基础设施</SelectItem>
                      <SelectItem value="process">流程改进</SelectItem>
                      <SelectItem value="research">研发项目</SelectItem>
                      <SelectItem value="marketing">市场推广</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">项目周期</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目周期" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">3个月以内</SelectItem>
                      <SelectItem value="medium">3-6个月</SelectItem>
                      <SelectItem value="long">6-12个月</SelectItem>
                      <SelectItem value="extended">12个月以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complexity">项目复杂度</Label>
                  <Select
                    value={formData.complexity}
                    onValueChange={(value) => setFormData({ ...formData, complexity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="评估复杂度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低 - 简单直接</SelectItem>
                      <SelectItem value="medium">中 - 中等复杂</SelectItem>
                      <SelectItem value="high">高 - 复杂多变</SelectItem>
                      <SelectItem value="critical">极高 - 关键战略</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geography">地理分布</Label>
                  <Select
                    value={formData.geography}
                    onValueChange={(value) => setFormData({ ...formData, geography: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择地理分布" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">同地办公</SelectItem>
                      <SelectItem value="distributed">分布式团队</SelectItem>
                      <SelectItem value="remote">远程团队</SelectItem>
                      <SelectItem value="global">全球团队</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="methodology">项目方法论</Label>
                <Select
                  value={formData.methodology}
                  onValueChange={(value) => setFormData({ ...formData, methodology: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择项目方法论" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waterfall">瀑布模型</SelectItem>
                    <SelectItem value="agile">敏捷开发</SelectItem>
                    <SelectItem value="hybrid">混合模式</SelectItem>
                    <SelectItem value="lean">精益方法</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stakeholders">关键干系人</Label>
                <Textarea
                  id="stakeholders"
                  placeholder="描述项目的主要干系人和他们的角色..."
                  value={formData.stakeholders}
                  onChange={(e) => setFormData({ ...formData, stakeholders: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">沟通挑战</Label>
                <Textarea
                  id="challenges"
                  placeholder="描述项目可能面临的沟通挑战和特殊要求..."
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !formData.projectName} className="w-full">
                {isGenerating ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    AI正在生成沟通计划...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    生成沟通管理计划
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
                    <MessageSquare className="h-12 w-12 mx-auto text-primary animate-pulse" />
                    <div>
                      <h3 className="font-medium">AI正在制定沟通计划</h3>
                      <p className="text-sm text-muted-foreground">正在分析沟通需求并生成管理策略...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedPlan && (
              <div className="space-y-6">
                {/* 沟通计划概览 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      {generatedPlan.projectName} - 沟通管理计划
                    </CardTitle>
                    <CardDescription>
                      包含 {generatedPlan.totalMeetings} 种会议类型和 {generatedPlan.communicationChannels} 个沟通渠道
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{generatedPlan.totalMeetings}</div>
                        <div className="text-sm text-muted-foreground">会议类型</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{generatedPlan.templates.length}</div>
                        <div className="text-sm text-muted-foreground">沟通模板</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {generatedPlan.escalationMatrix.length}
                        </div>
                        <div className="text-sm text-muted-foreground">升级层级</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 会议计划 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      会议沟通计划
                    </CardTitle>
                    <CardDescription>项目各阶段的会议安排和沟通机制</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedPlan.plans.map((plan) => (
                        <div key={plan.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium">{plan.type}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{plan.purpose}</p>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <Badge className={getFrequencyColor(plan.frequency)}>{plan.frequency}</Badge>
                              <Badge variant="outline">{plan.duration}</Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-muted-foreground">参与者:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {plan.participants.map((participant, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {participant}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">会议形式:</span>
                                <span className="ml-2">{plan.format}</span>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">负责人:</span>
                                <span className="ml-2">{plan.owner}</span>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">交付物:</span>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {plan.deliverables.map((deliverable, index) => (
                                  <li key={index} className="text-xs">
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 升级矩阵 */}
                <Card>
                  <CardHeader>
                    <CardTitle>问题升级矩阵</CardTitle>
                    <CardDescription>不同级别问题的处理流程和联系人</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {generatedPlan.escalationMatrix.map((level, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="grid grid-cols-4 gap-4 items-center">
                            <div>
                              <span className="font-medium text-sm">{level.level}</span>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">{level.trigger}</span>
                            </div>
                            <div>
                              <Badge variant="outline" className="text-xs">
                                {level.contact}
                              </Badge>
                            </div>
                            <div>
                              <Badge variant="secondary" className="text-xs">
                                {level.timeframe}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 沟通模板 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      沟通模板库
                    </CardTitle>
                    <CardDescription>标准化的沟通文档模板</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {generatedPlan.templates.map((template, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{template.purpose}</p>
                          <Badge variant="outline" className="text-xs mt-2">
                            {template.frequency}
                          </Badge>
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
                      AI沟通管理建议
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
                    导出沟通计划
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
