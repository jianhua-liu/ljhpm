"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, AlertTriangle, Sparkles } from "lucide-react"

interface Risk {
  id: string
  title: string
  description: string
  category: string
  probability: number
  impact: number
  riskLevel: string
  mitigation: string
  contingency: string
  owner: string
}

interface GeneratedRiskMatrix {
  projectName: string
  totalRisks: number
  highRisks: number
  risks: Risk[]
  recommendations: string[]
}

interface RiskGeneratorProps {
  onBack: () => void
}

export default function RiskGenerator({ onBack }: RiskGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRisks, setGeneratedRisks] = useState<GeneratedRiskMatrix | null>(null)
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    industry: "",
    budget: "",
    timeline: "",
    teamExperience: "",
    technology: "",
    stakeholders: "",
    constraints: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockRisks: GeneratedRiskMatrix = {
      projectName: formData.projectName || "AI驱动的电商平台开发",
      totalRisks: 8,
      highRisks: 2,
      risks: [
        {
          id: "1",
          title: "关键技术人员离职",
          description: "核心开发人员可能在项目关键阶段离职，导致知识流失和进度延误",
          category: "人力资源",
          probability: 3,
          impact: 4,
          riskLevel: "高",
          mitigation: "建立知识文档体系，实施交叉培训，提供有竞争力的薪酬包",
          contingency: "紧急招聘计划，外包支持，内部人员调配",
          owner: "HR经理",
        },
        {
          id: "2",
          title: "第三方API服务不稳定",
          description: "依赖的支付、物流等第三方API可能出现服务中断或性能问题",
          category: "技术风险",
          probability: 4,
          impact: 3,
          riskLevel: "高",
          mitigation: "选择多个备用服务商，实现API监控和自动切换机制",
          contingency: "启用备用API，临时降级服务功能",
          owner: "技术负责人",
        },
        {
          id: "3",
          title: "需求变更频繁",
          description: "客户可能频繁变更需求，导致开发返工和项目延期",
          category: "需求管理",
          probability: 4,
          impact: 4,
          riskLevel: "极高",
          mitigation: "建立严格的变更控制流程，定期需求评审会议",
          contingency: "调整项目范围，延长项目时间线",
          owner: "产品经理",
        },
        {
          id: "4",
          title: "预算超支",
          description: "项目成本可能超出预算限制，影响项目可持续性",
          category: "财务风险",
          probability: 2,
          impact: 5,
          riskLevel: "中",
          mitigation: "严格成本控制，每周预算审查，提前预警机制",
          contingency: "申请额外预算，缩减非核心功能",
          owner: "项目经理",
        },
        {
          id: "5",
          title: "安全漏洞风险",
          description: "系统可能存在安全漏洞，导致数据泄露或系统被攻击",
          category: "安全风险",
          probability: 3,
          impact: 5,
          riskLevel: "高",
          mitigation: "定期安全审计，代码安全扫描，渗透测试",
          contingency: "紧急安全补丁，系统临时下线",
          owner: "安全专家",
        },
        {
          id: "6",
          title: "性能不达标",
          description: "系统性能可能无法满足高并发访问需求",
          category: "技术风险",
          probability: 3,
          impact: 3,
          riskLevel: "中",
          mitigation: "性能测试，代码优化，架构调整",
          contingency: "增加服务器资源，优化数据库",
          owner: "架构师",
        },
        {
          id: "7",
          title: "法规合规风险",
          description: "可能不符合数据保护法规要求，面临法律风险",
          category: "合规风险",
          probability: 2,
          impact: 4,
          riskLevel: "中",
          mitigation: "法规咨询，合规审查，隐私保护设计",
          contingency: "紧急合规整改，法律咨询",
          owner: "法务部门",
        },
        {
          id: "8",
          title: "市场竞争加剧",
          description: "竞争对手可能推出类似产品，影响项目商业价值",
          category: "市场风险",
          probability: 3,
          impact: 2,
          riskLevel: "低",
          mitigation: "市场调研，差异化功能，加快上市速度",
          contingency: "调整产品策略，寻找新的市场定位",
          owner: "市场部门",
        },
      ],
      recommendations: [
        "建议每周进行风险评估会议，及时更新风险状态",
        "对于高风险项目，建议建立专门的风险管理小组",
        "实施风险预警机制，设置关键指标监控",
        "定期进行风险应对措施的有效性评估",
        "建立风险知识库，积累风险管理经验",
      ],
    }

    setGeneratedRisks(mockRisks)
    setIsGenerating(false)
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "极高":
        return "bg-red-600 text-white"
      case "高":
        return "bg-red-500 text-white"
      case "中":
        return "bg-yellow-500 text-white"
      case "低":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      技术风险: "bg-blue-100 text-blue-800",
      人力资源: "bg-green-100 text-green-800",
      需求管理: "bg-purple-100 text-purple-800",
      财务风险: "bg-orange-100 text-orange-800",
      安全风险: "bg-red-100 text-red-800",
      合规风险: "bg-gray-100 text-gray-800",
      市场风险: "bg-pink-100 text-pink-800",
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
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI项目风险管理生成器</h1>
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
                项目风险评估信息
              </CardTitle>
              <CardDescription>请提供项目详细信息，AI将识别潜在风险并生成风险管理矩阵</CardDescription>
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
                      <SelectItem value="ai">AI/机器学习</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="ecommerce">电商零售</SelectItem>
                      <SelectItem value="finance">金融服务</SelectItem>
                      <SelectItem value="healthcare">医疗健康</SelectItem>
                      <SelectItem value="education">教育培训</SelectItem>
                      <SelectItem value="manufacturing">制造业</SelectItem>
                      <SelectItem value="government">政府机构</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">项目预算</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择预算范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">50万以下</SelectItem>
                      <SelectItem value="medium">50-200万</SelectItem>
                      <SelectItem value="large">200-500万</SelectItem>
                      <SelectItem value="enterprise">500万以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeline">项目周期</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
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
                <div className="space-y-2">
                  <Label htmlFor="teamExperience">团队经验</Label>
                  <Select
                    value={formData.teamExperience}
                    onValueChange={(value) => setFormData({ ...formData, teamExperience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="评估团队经验" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">初级 - 团队经验较少</SelectItem>
                      <SelectItem value="intermediate">中级 - 有一定项目经验</SelectItem>
                      <SelectItem value="senior">高级 - 经验丰富</SelectItem>
                      <SelectItem value="expert">专家 - 行业顶尖团队</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technology">技术栈和工具</Label>
                <Textarea
                  id="technology"
                  placeholder="描述项目使用的主要技术、框架、第三方服务等..."
                  value={formData.technology}
                  onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stakeholders">关键干系人</Label>
                <Textarea
                  id="stakeholders"
                  placeholder="描述项目的主要干系人、客户类型、监管要求等..."
                  value={formData.stakeholders}
                  onChange={(e) => setFormData({ ...formData, stakeholders: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">特殊约束和挑战</Label>
                <Textarea
                  id="constraints"
                  placeholder="描述项目面临的特殊约束、已知挑战、外部依赖等..."
                  value={formData.constraints}
                  onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !formData.projectName} className="w-full">
                {isGenerating ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    AI正在分析风险...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    生成风险管理矩阵
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
                    <AlertTriangle className="h-12 w-12 mx-auto text-primary animate-pulse" />
                    <div>
                      <h3 className="font-medium">AI正在识别项目风险</h3>
                      <p className="text-sm text-muted-foreground">正在分析潜在风险并生成应对策略...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedRisks && (
              <div className="space-y-6">
                {/* 风险概览 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      {generatedRisks.projectName} - 风险评估报告
                    </CardTitle>
                    <CardDescription>
                      AI识别出 {generatedRisks.totalRisks} 个潜在风险，其中 {generatedRisks.highRisks} 个高风险项目
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{generatedRisks.highRisks}</div>
                        <div className="text-sm text-muted-foreground">高风险</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {generatedRisks.risks.filter((r) => r.riskLevel === "中").length}
                        </div>
                        <div className="text-sm text-muted-foreground">中风险</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {generatedRisks.risks.filter((r) => r.riskLevel === "低").length}
                        </div>
                        <div className="text-sm text-muted-foreground">低风险</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 风险矩阵 */}
                <Card>
                  <CardHeader>
                    <CardTitle>风险评估矩阵</CardTitle>
                    <CardDescription>根据发生概率和影响程度的风险分布</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 grid-rows-6 gap-1 h-64 mb-4">
                      {/* Y轴标签 */}
                      <div className="flex items-center justify-center text-xs font-medium">影响</div>
                      <div className="flex items-center justify-center text-xs">5</div>
                      <div className="flex items-center justify-center text-xs">4</div>
                      <div className="flex items-center justify-center text-xs">3</div>
                      <div className="flex items-center justify-center text-xs">2</div>
                      <div className="flex items-center justify-center text-xs">1</div>

                      {/* 矩阵单元格 */}
                      {[5, 4, 3, 2, 1].map((impact) =>
                        [1, 2, 3, 4, 5].map((probability) => {
                          const cellRisks = generatedRisks.risks.filter(
                            (r) => r.impact === impact && r.probability === probability,
                          )
                          const score = probability * impact
                          let bgColor = "bg-gray-50"
                          if (score >= 16) bgColor = "bg-red-600"
                          else if (score >= 12) bgColor = "bg-red-500"
                          else if (score >= 8) bgColor = "bg-yellow-500"
                          else if (score >= 4) bgColor = "bg-green-500"

                          return (
                            <div
                              key={`${impact}-${probability}`}
                              className={`border rounded p-1 min-h-[40px] ${bgColor} ${cellRisks.length > 0 ? "text-white" : ""}`}
                            >
                              {cellRisks.map((risk) => (
                                <div key={risk.id} className="text-xs truncate" title={risk.title}>
                                  {risk.title.substring(0, 8)}...
                                </div>
                              ))}
                            </div>
                          )
                        }),
                      )}

                      {/* X轴标签 */}
                      <div className="flex items-center justify-center text-xs font-medium">概率</div>
                      <div className="flex items-center justify-center text-xs">1</div>
                      <div className="flex items-center justify-center text-xs">2</div>
                      <div className="flex items-center justify-center text-xs">3</div>
                      <div className="flex items-center justify-center text-xs">4</div>
                      <div className="flex items-center justify-center text-xs">5</div>
                    </div>
                  </CardContent>
                </Card>

                {/* 风险详细列表 */}
                <Card>
                  <CardHeader>
                    <CardTitle>风险详细信息</CardTitle>
                    <CardDescription>所有识别风险的详细分析和应对措施</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedRisks.risks.map((risk) => (
                        <div key={risk.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium">{risk.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <Badge className={getRiskLevelColor(risk.riskLevel)}>{risk.riskLevel}风险</Badge>
                              <Badge className={getCategoryColor(risk.category)}>{risk.category}</Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">概率:</span>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`w-3 h-3 rounded-full ${
                                        level <= risk.probability ? "bg-red-500" : "bg-gray-200"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2">{risk.probability}/5</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">影响:</span>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                      key={level}
                                      className={`w-3 h-3 rounded-full ${
                                        level <= risk.impact ? "bg-orange-500" : "bg-gray-200"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2">{risk.impact}/5</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">负责人:</span>
                                <span className="ml-2">{risk.owner}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <span className="text-muted-foreground font-medium">缓解措施:</span>
                                <p className="text-sm mt-1">{risk.mitigation}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground font-medium">应急计划:</span>
                                <p className="text-sm mt-1">{risk.contingency}</p>
                              </div>
                            </div>
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
                      AI风险管理建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {generatedRisks.recommendations.map((recommendation, index) => (
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
                    导出风险报告
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
