"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, AlertTriangle } from "lucide-react"

interface Risk {
  id: string
  title: string
  description: string
  category: "technical" | "business" | "external" | "operational"
  probability: 1 | 2 | 3 | 4 | 5
  impact: 1 | 2 | 3 | 4 | 5
  status: "identified" | "analyzing" | "mitigating" | "monitoring" | "closed"
  owner: string
  mitigation: string
  contingency: string
}

const mockRisks: Risk[] = [
  {
    id: "1",
    title: "关键开发人员离职",
    description: "核心技术人员可能在项目关键阶段离职",
    category: "operational",
    probability: 3,
    impact: 4,
    status: "mitigating",
    owner: "HR部门",
    mitigation: "建立知识文档，交叉培训，提供激励措施",
    contingency: "紧急招聘，外包支持",
  },
  {
    id: "2",
    title: "第三方API不稳定",
    description: "依赖的第三方服务可能出现不稳定或中断",
    category: "technical",
    probability: 4,
    impact: 3,
    status: "monitoring",
    owner: "技术团队",
    mitigation: "实现备用API，增加重试机制",
    contingency: "切换到备用服务商",
  },
  {
    id: "3",
    title: "需求变更频繁",
    description: "客户可能频繁变更需求导致项目延期",
    category: "business",
    probability: 4,
    impact: 4,
    status: "analyzing",
    owner: "产品经理",
    mitigation: "建立变更控制流程，定期需求评审",
    contingency: "调整项目范围和时间线",
  },
  {
    id: "4",
    title: "预算超支",
    description: "项目成本可能超出预算限制",
    category: "business",
    probability: 2,
    impact: 5,
    status: "monitoring",
    owner: "项目经理",
    mitigation: "严格成本控制，定期预算审查",
    contingency: "申请额外预算或缩减功能",
  },
]

const getRiskLevel = (probability: number, impact: number) => {
  const score = probability * impact
  if (score >= 16) return { level: "极高", color: "bg-red-600 text-white" }
  if (score >= 12) return { level: "高", color: "bg-red-500 text-white" }
  if (score >= 8) return { level: "中", color: "bg-yellow-500 text-white" }
  if (score >= 4) return { level: "低", color: "bg-green-500 text-white" }
  return { level: "极低", color: "bg-green-600 text-white" }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "technical":
      return "bg-blue-100 text-blue-800"
    case "business":
      return "bg-purple-100 text-purple-800"
    case "external":
      return "bg-orange-100 text-orange-800"
    case "operational":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "identified":
      return "bg-gray-100 text-gray-800"
    case "analyzing":
      return "bg-yellow-100 text-yellow-800"
    case "mitigating":
      return "bg-blue-100 text-blue-800"
    case "monitoring":
      return "bg-green-100 text-green-800"
    case "closed":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function RiskMatrix() {
  const [risks, setRisks] = useState<Risk[]>(mockRisks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">风险矩阵</h2>
          <p className="text-muted-foreground">识别、评估和管理项目风险</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加风险
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>添加新风险</DialogTitle>
              <DialogDescription>识别并评估新的项目风险</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  风险标题
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  风险类别
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择风险类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">技术风险</SelectItem>
                    <SelectItem value="business">业务风险</SelectItem>
                    <SelectItem value="external">外部风险</SelectItem>
                    <SelectItem value="operational">运营风险</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="probability" className="text-right">
                  发生概率
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择概率等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - 很低</SelectItem>
                    <SelectItem value="2">2 - 低</SelectItem>
                    <SelectItem value="3">3 - 中等</SelectItem>
                    <SelectItem value="4">4 - 高</SelectItem>
                    <SelectItem value="5">5 - 很高</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="impact" className="text-right">
                  影响程度
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择影响等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - 很低</SelectItem>
                    <SelectItem value="2">2 - 低</SelectItem>
                    <SelectItem value="3">3 - 中等</SelectItem>
                    <SelectItem value="4">4 - 高</SelectItem>
                    <SelectItem value="5">5 - 很高</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                添加风险
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 风险矩阵图 */}
      <Card>
        <CardHeader>
          <CardTitle>风险评估矩阵</CardTitle>
          <CardDescription>根据发生概率和影响程度对风险进行可视化分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 grid-rows-6 gap-2 h-96">
            {/* Y轴标签 - 影响程度 */}
            <div className="flex items-center justify-center text-xs font-medium text-muted-foreground">影响程度</div>
            <div className="flex items-center justify-center text-xs">5</div>
            <div className="flex items-center justify-center text-xs">4</div>
            <div className="flex items-center justify-center text-xs">3</div>
            <div className="flex items-center justify-center text-xs">2</div>
            <div className="flex items-center justify-center text-xs">1</div>

            {/* 矩阵单元格 */}
            {[5, 4, 3, 2, 1].map((impact) =>
              [1, 2, 3, 4, 5].map((probability) => {
                const cellRisks = risks.filter((r) => r.impact === impact && r.probability === probability)
                const riskLevel = getRiskLevel(probability, impact)

                return (
                  <div
                    key={`${impact}-${probability}`}
                    className={`border rounded p-2 min-h-[60px] ${
                      cellRisks.length > 0 ? riskLevel.color : "bg-gray-50"
                    }`}
                  >
                    {cellRisks.map((risk) => (
                      <div key={risk.id} className="text-xs mb-1 truncate" title={risk.title}>
                        {risk.title}
                      </div>
                    ))}
                  </div>
                )
              }),
            )}

            {/* X轴标签 - 发生概率 */}
            <div className="flex items-center justify-center text-xs font-medium text-muted-foreground">发生概率</div>
            <div className="flex items-center justify-center text-xs">1</div>
            <div className="flex items-center justify-center text-xs">2</div>
            <div className="flex items-center justify-center text-xs">3</div>
            <div className="flex items-center justify-center text-xs">4</div>
            <div className="flex items-center justify-center text-xs">5</div>
          </div>

          {/* 风险等级说明 */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span>极高风险</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>高风险</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>中等风险</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>低风险</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span>极低风险</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 风险详细列表 */}
      <Card>
        <CardHeader>
          <CardTitle>风险详细信息</CardTitle>
          <CardDescription>所有已识别风险的详细信息和应对措施</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk) => {
              const riskLevel = getRiskLevel(risk.probability, risk.impact)
              return (
                <div key={risk.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {risk.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={riskLevel.color}>{riskLevel.level}风险</Badge>
                      <Badge className={getCategoryColor(risk.category)}>
                        {risk.category === "technical"
                          ? "技术"
                          : risk.category === "business"
                            ? "业务"
                            : risk.category === "external"
                              ? "外部"
                              : "运营"}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status === "identified"
                          ? "已识别"
                          : risk.status === "analyzing"
                            ? "分析中"
                            : risk.status === "mitigating"
                              ? "缓解中"
                              : risk.status === "monitoring"
                                ? "监控中"
                                : "已关闭"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
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
                      <div className="flex items-center gap-4 mb-2">
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
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">负责人:</span>
                        <span>{risk.owner}</span>
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
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
