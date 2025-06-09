"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Bot, Users, Sparkles, Building } from "lucide-react"

interface Stakeholder {
  id: string
  name: string
  role: string
  organization: string
  influence: "high" | "medium" | "low"
  interest: "high" | "medium" | "low"
  category: "internal" | "external" | "customer" | "vendor" | "regulator"
  communication: string
  expectations: string
  concerns: string[]
  engagement: string
}

interface GeneratedStakeholders {
  projectName: string
  totalStakeholders: number
  keyStakeholders: number
  stakeholders: Stakeholder[]
  communicationPlan: {
    frequency: string
    method: string
    content: string[]
  }[]
  recommendations: string[]
}

interface StakeholderGeneratorProps {
  onBack: () => void
}

export default function StakeholderGenerator({ onBack }: StakeholderGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedStakeholders, setGeneratedStakeholders] = useState<GeneratedStakeholders | null>(null)
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    organization: "",
    scope: "",
    budget: "",
    timeline: "",
    industry: "",
    geography: "",
    objectives: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockStakeholders: GeneratedStakeholders = {
      projectName: formData.projectName || "AI驱动的电商平台开发",
      totalStakeholders: 12,
      keyStakeholders: 5,
      stakeholders: [
        {
          id: "1",
          name: "王总",
          role: "项目发起人/CEO",
          organization: "公司总部",
          influence: "high",
          interest: "high",
          category: "internal",
          communication: "每周一对一会议，重要决策邮件确认",
          expectations: "项目按时交付，实现预期ROI，提升公司竞争力",
          concerns: ["预算控制", "市场竞争", "技术风险"],
          engagement: "定期汇报项目进展，重大决策需要其批准",
        },
        {
          id: "2",
          name: "李经理",
          role: "产品总监",
          organization: "产品部",
          influence: "high",
          interest: "high",
          category: "internal",
          communication: "每日站会，每周产品评审",
          expectations: "产品功能完整，用户体验优秀，符合市场需求",
          concerns: ["功能完整性", "用户体验", "上线时间"],
          engagement: "深度参与需求定义和产品设计",
        },
        {
          id: "3",
          name: "张客户",
          role: "大客户代表",
          organization: "ABC集团",
          influence: "medium",
          interest: "high",
          category: "customer",
          communication: "双周客户会议，月度需求评审",
          expectations: "系统稳定可靠，满足业务需求，良好的技术支持",
          concerns: ["系统稳定性", "数据安全", "培训支持"],
          engagement: "参与需求确认和用户验收测试",
        },
        {
          id: "4",
          name: "赵总监",
          role: "技术总监",
          organization: "技术部",
          influence: "high",
          interest: "medium",
          category: "internal",
          communication: "技术评审会议，架构讨论",
          expectations: "技术架构合理，代码质量高，系统可维护",
          concerns: ["技术债务", "系统性能", "团队能力"],
          engagement: "技术方案审核和团队资源协调",
        },
        {
          id: "5",
          name: "钱经理",
          role: "财务经理",
          organization: "财务部",
          influence: "medium",
          interest: "medium",
          category: "internal",
          communication: "月度预算会议，成本报告",
          expectations: "严格控制成本，按预算执行，ROI可衡量",
          concerns: ["预算超支", "成本控制", "投资回报"],
          engagement: "预算审批和成本监控",
        },
        {
          id: "6",
          name: "孙供应商",
          role: "技术合作伙伴",
          organization: "XYZ科技",
          influence: "medium",
          interest: "medium",
          category: "vendor",
          communication: "项目协调会议，技术对接",
          expectations: "合作顺利，按时交付，建立长期合作关系",
          concerns: ["技术对接", "交付质量", "付款周期"],
          engagement: "提供技术服务和支持",
        },
        {
          id: "7",
          name: "周主管",
          role: "质量保证主管",
          organization: "质量部",
          influence: "medium",
          interest: "high",
          category: "internal",
          communication: "质量评审会议，测试报告",
          expectations: "产品质量达标，测试覆盖全面，缺陷率低",
          concerns: ["质量标准", "测试覆盖", "发布风险"],
          engagement: "质量标准制定和测试监督",
        },
        {
          id: "8",
          name: "吴经理",
          role: "运营经理",
          organization: "运营部",
          influence: "medium",
          interest: "high",
          category: "internal",
          communication: "运营需求会议，数据分析",
          expectations: "系统易用，数据准确，支持业务增长",
          concerns: ["系统易用性", "数据准确性", "运营效率"],
          engagement: "运营需求提供和系统使用培训",
        },
        {
          id: "9",
          name: "郑律师",
          role: "法务顾问",
          organization: "法务部",
          influence: "low",
          interest: "medium",
          category: "internal",
          communication: "合规审查会议，法律咨询",
          expectations: "符合法规要求，合同条款清晰，风险可控",
          concerns: ["合规风险", "数据保护", "知识产权"],
          engagement: "合规审查和法律风险评估",
        },
        {
          id: "10",
          name: "王监管",
          role: "行业监管代表",
          organization: "监管机构",
          influence: "high",
          interest: "low",
          category: "regulator",
          communication: "合规报告，监管沟通",
          expectations: "严格遵守行业规范，数据安全合规",
          concerns: ["监管合规", "数据安全", "行业标准"],
          engagement: "监管要求传达和合规检查",
        },
      ],
      communicationPlan: [
        {
          frequency: "每周",
          method: "项目状态会议",
          content: ["进度汇报", "风险识别", "问题解决", "下周计划"],
        },
        {
          frequency: "双周",
          method: "干系人大会",
          content: ["里程碑回顾", "需求变更", "质量报告", "预算状态"],
        },
        {
          frequency: "每月",
          method: "高层汇报",
          content: ["项目总结", "关键指标", "风险评估", "资源需求"],
        },
        {
          frequency: "按需",
          method: "紧急沟通",
          content: ["重大问题", "紧急决策", "风险应对", "变更通知"],
        },
      ],
      recommendations: [
        "建立干系人沟通矩阵，明确沟通频率和方式",
        "定期更新干系人影响力和兴趣度评估",
        "为高影响力干系人制定专门的参与策略",
        "建立干系人反馈收集和处理机制",
        "定期进行干系人满意度调查",
        "制定干系人冲突解决预案",
      ],
    }

    setGeneratedStakeholders(mockStakeholders)
    setIsGenerating(false)
  }

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
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

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case "high":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-purple-100 text-purple-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      internal: "bg-green-100 text-green-800",
      external: "bg-blue-100 text-blue-800",
      customer: "bg-orange-100 text-orange-800",
      vendor: "bg-purple-100 text-purple-800",
      regulator: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
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
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI干系人管理生成器</h1>
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
                项目干系人分析信息
              </CardTitle>
              <CardDescription>请提供项目详细信息，AI将识别关键干系人并生成管理策略</CardDescription>
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
                      <SelectItem value="product">产品开发</SelectItem>
                      <SelectItem value="system">系统实施</SelectItem>
                      <SelectItem value="process">流程改进</SelectItem>
                      <SelectItem value="infrastructure">基础设施</SelectItem>
                      <SelectItem value="research">研发项目</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">组织类型</Label>
                  <Select
                    value={formData.organization}
                    onValueChange={(value) => setFormData({ ...formData, organization: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择组织类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">初创公司</SelectItem>
                      <SelectItem value="sme">中小企业</SelectItem>
                      <SelectItem value="enterprise">大型企业</SelectItem>
                      <SelectItem value="government">政府机构</SelectItem>
                      <SelectItem value="ngo">非营利组织</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">行业领域</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择行业" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">科技互联网</SelectItem>
                      <SelectItem value="finance">金融服务</SelectItem>
                      <SelectItem value="healthcare">医疗健康</SelectItem>
                      <SelectItem value="manufacturing">制造业</SelectItem>
                      <SelectItem value="retail">零售电商</SelectItem>
                      <SelectItem value="education">教育培训</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">项目规模</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目规模" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">小型项目</SelectItem>
                      <SelectItem value="medium">中型项目</SelectItem>
                      <SelectItem value="large">大型项目</SelectItem>
                      <SelectItem value="strategic">战略项目</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geography">地理范围</Label>
                  <Select
                    value={formData.geography}
                    onValueChange={(value) => setFormData({ ...formData, geography: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择地理范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地</SelectItem>
                      <SelectItem value="national">全国</SelectItem>
                      <SelectItem value="regional">区域性</SelectItem>
                      <SelectItem value="global">全球</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">项目范围和目标</Label>
                <Textarea
                  id="scope"
                  placeholder="详细描述项目的范围、目标和预期成果..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objectives">关键成功因素</Label>
                <Textarea
                  id="objectives"
                  placeholder="描述项目成功的关键因素和衡量标准..."
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  rows={2}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !formData.projectName} className="w-full">
                {isGenerating ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    AI正在分析干系人...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    生成干系人管理方案
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
                    <Users className="h-12 w-12 mx-auto text-primary animate-pulse" />
                    <div>
                      <h3 className="font-medium">AI正在识别项目干系人</h3>
                      <p className="text-sm text-muted-foreground">正在分析干系人影响力和制定管理策略...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedStakeholders && (
              <div className="space-y-6">
                {/* 干系人概览 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      {generatedStakeholders.projectName} - 干系人分析
                    </CardTitle>
                    <CardDescription>
                      识别出 {generatedStakeholders.totalStakeholders} 个干系人，其中{" "}
                      {generatedStakeholders.keyStakeholders} 个关键干系人
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {generatedStakeholders.stakeholders.filter((s) => s.influence === "high").length}
                        </div>
                        <div className="text-sm text-muted-foreground">高影响力</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {generatedStakeholders.stakeholders.filter((s) => s.interest === "high").length}
                        </div>
                        <div className="text-sm text-muted-foreground">高兴趣度</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {generatedStakeholders.stakeholders.filter((s) => s.category === "internal").length}
                        </div>
                        <div className="text-sm text-muted-foreground">内部干系人</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 干系人影响力矩阵 */}
                <Card>
                  <CardHeader>
                    <CardTitle>干系人影响力矩阵</CardTitle>
                    <CardDescription>根据影响力和兴趣度的干系人分布</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 grid-rows-4 gap-2 h-64">
                      {/* 标签 */}
                      <div className="flex items-center justify-center text-xs font-medium">兴趣度</div>
                      <div className="flex items-center justify-center text-xs">高</div>
                      <div className="flex items-center justify-center text-xs">中</div>
                      <div className="flex items-center justify-center text-xs">低</div>

                      {/* 矩阵单元格 */}
                      {["high", "medium", "low"].map((influence) =>
                        ["high", "medium", "low"].map((interest) => {
                          const cellStakeholders = generatedStakeholders.stakeholders.filter(
                            (s) => s.influence === influence && s.interest === interest,
                          )

                          let bgColor = "bg-gray-50"
                          if (influence === "high" && interest === "high") bgColor = "bg-red-100"
                          else if (influence === "high" || interest === "high") bgColor = "bg-yellow-100"
                          else if (influence === "medium" && interest === "medium") bgColor = "bg-blue-100"

                          return (
                            <div
                              key={`${influence}-${interest}`}
                              className={`border rounded p-2 min-h-[60px] ${bgColor}`}
                            >
                              <div className="text-xs font-medium mb-1">
                                {influence === "high" ? "高" : influence === "medium" ? "中" : "低"}影响力
                              </div>
                              {cellStakeholders.map((stakeholder) => (
                                <div key={stakeholder.id} className="flex items-center gap-1 mb-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarFallback className="text-xs">{stakeholder.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs truncate">{stakeholder.name}</span>
                                </div>
                              ))}
                            </div>
                          )
                        }),
                      )}

                      {/* Y轴标签 */}
                      <div className="flex items-center justify-center text-xs font-medium">影响力</div>
                      <div className="flex items-center justify-center text-xs">高</div>
                      <div className="flex items-center justify-center text-xs">中</div>
                      <div className="flex items-center justify-center text-xs">低</div>
                    </div>
                  </CardContent>
                </Card>

                {/* 干系人详细信息 */}
                <Card>
                  <CardHeader>
                    <CardTitle>干系人详细信息</CardTitle>
                    <CardDescription>关键干系人的详细分析和管理策略</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedStakeholders.stakeholders.slice(0, 6).map((stakeholder) => (
                        <div key={stakeholder.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarFallback>{stakeholder.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{stakeholder.name}</h4>
                                <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Building className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{stakeholder.organization}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Badge className={getInfluenceColor(stakeholder.influence)}>
                                影响力:{" "}
                                {stakeholder.influence === "high"
                                  ? "高"
                                  : stakeholder.influence === "medium"
                                    ? "中"
                                    : "低"}
                              </Badge>
                              <Badge className={getInterestColor(stakeholder.interest)}>
                                兴趣度:{" "}
                                {stakeholder.interest === "high"
                                  ? "高"
                                  : stakeholder.interest === "medium"
                                    ? "中"
                                    : "低"}
                              </Badge>
                              <Badge className={getCategoryColor(stakeholder.category)}>
                                {stakeholder.category === "internal"
                                  ? "内部"
                                  : stakeholder.category === "external"
                                    ? "外部"
                                    : stakeholder.category === "customer"
                                      ? "客户"
                                      : stakeholder.category === "vendor"
                                        ? "供应商"
                                        : "监管"}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-muted-foreground">期望:</span>
                                <p className="mt-1">{stakeholder.expectations}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">关注点:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {stakeholder.concerns.map((concern, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {concern}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-muted-foreground">沟通方式:</span>
                                <p className="mt-1">{stakeholder.communication}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">参与策略:</span>
                                <p className="mt-1">{stakeholder.engagement}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 沟通计划 */}
                <Card>
                  <CardHeader>
                    <CardTitle>沟通管理计划</CardTitle>
                    <CardDescription>AI生成的干系人沟通策略</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedStakeholders.communicationPlan.map((plan, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{plan.method}</h4>
                            <Badge variant="outline">{plan.frequency}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {plan.content.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
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
                      AI干系人管理建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {generatedStakeholders.recommendations.map((recommendation, index) => (
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
                    导出干系人报告
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
