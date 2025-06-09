"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Mail, Phone, Building } from "lucide-react"

interface Stakeholder {
  id: string
  name: string
  role: string
  organization: string
  email: string
  phone: string
  influence: "high" | "medium" | "low"
  interest: "high" | "medium" | "low"
  category: "internal" | "external" | "customer" | "vendor"
  notes: string
}

const mockStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "王总",
    role: "项目发起人",
    organization: "公司总部",
    email: "wang@company.com",
    phone: "138-0000-0001",
    influence: "high",
    interest: "high",
    category: "internal",
    notes: "项目的最终决策者，需要定期汇报项目进展",
  },
  {
    id: "2",
    name: "李经理",
    role: "产品经理",
    organization: "产品部",
    email: "li@company.com",
    phone: "138-0000-0002",
    influence: "high",
    interest: "high",
    category: "internal",
    notes: "负责产品需求定义和用户体验设计",
  },
  {
    id: "3",
    name: "张客户",
    role: "客户代表",
    organization: "ABC公司",
    email: "zhang@abc.com",
    phone: "138-0000-0003",
    influence: "medium",
    interest: "high",
    category: "customer",
    notes: "主要客户代表，对项目成果有重要影响",
  },
  {
    id: "4",
    name: "赵供应商",
    role: "技术顾问",
    organization: "XYZ技术公司",
    email: "zhao@xyz.com",
    phone: "138-0000-0004",
    influence: "medium",
    interest: "medium",
    category: "vendor",
    notes: "提供技术支持和咨询服务",
  },
]

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
  switch (category) {
    case "internal":
      return "bg-green-100 text-green-800"
    case "external":
      return "bg-blue-100 text-blue-800"
    case "customer":
      return "bg-orange-100 text-orange-800"
    case "vendor":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function StakeholderManagement() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(mockStakeholders)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">干系人管理</h2>
          <p className="text-muted-foreground">管理项目相关的所有利益相关者</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加干系人
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>添加新干系人</DialogTitle>
              <DialogDescription>填写干系人的基本信息和影响力评估</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  角色
                </Label>
                <Input id="role" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="influence" className="text-right">
                  影响力
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择影响力级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="low">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 干系人矩阵 */}
      <Card>
        <CardHeader>
          <CardTitle>干系人影响力矩阵</CardTitle>
          <CardDescription>根据影响力和兴趣度对干系人进行分类管理</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 grid-rows-3 gap-4 h-96">
            {/* 矩阵标签 */}
            <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">高兴趣</div>
            <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">中兴趣</div>
            <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">低兴趣</div>

            {/* 高影响力行 */}
            <div className="border-2 border-red-200 bg-red-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-red-800 mb-2">高影响力 + 高兴趣</div>
              <div className="space-y-2">
                {stakeholders
                  .filter((s) => s.influence === "high" && s.interest === "high")
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{stakeholder.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{stakeholder.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-2 border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-yellow-800 mb-2">高影响力 + 中兴趣</div>
            </div>
            <div className="border-2 border-orange-200 bg-orange-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-orange-800 mb-2">高影响力 + 低兴趣</div>
            </div>

            {/* 中影响力行 */}
            <div className="border-2 border-blue-200 bg-blue-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-blue-800 mb-2">中影响力 + 高兴趣</div>
              <div className="space-y-2">
                {stakeholders
                  .filter((s) => s.influence === "medium" && s.interest === "high")
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{stakeholder.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{stakeholder.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-2 border-purple-200 bg-purple-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-purple-800 mb-2">中影响力 + 中兴趣</div>
              <div className="space-y-2">
                {stakeholders
                  .filter((s) => s.influence === "medium" && s.interest === "medium")
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{stakeholder.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{stakeholder.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-2 border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-gray-800 mb-2">中影响力 + 低兴趣</div>
            </div>

            {/* 低影响力行 */}
            <div className="border-2 border-green-200 bg-green-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-green-800 mb-2">低影响力 + 高兴趣</div>
            </div>
            <div className="border-2 border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-gray-800 mb-2">低影响力 + 中兴趣</div>
            </div>
            <div className="border-2 border-gray-200 bg-gray-50 p-4 rounded-lg">
              <div className="text-xs font-medium text-gray-800 mb-2">低影响力 + 低兴趣</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 干系人列表 */}
      <Card>
        <CardHeader>
          <CardTitle>干系人详细信息</CardTitle>
          <CardDescription>所有项目干系人的详细联系信息和备注</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stakeholders.map((stakeholder) => (
              <div key={stakeholder.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{stakeholder.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium">{stakeholder.name}</h4>
                        <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {stakeholder.organization}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {stakeholder.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {stakeholder.phone}
                        </div>
                      </div>
                      {stakeholder.notes && <p className="text-sm text-muted-foreground">{stakeholder.notes}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getInfluenceColor(stakeholder.influence)}>
                      影响力:{" "}
                      {stakeholder.influence === "high" ? "高" : stakeholder.influence === "medium" ? "中" : "低"}
                    </Badge>
                    <Badge className={getInterestColor(stakeholder.interest)}>
                      兴趣度: {stakeholder.interest === "high" ? "高" : stakeholder.interest === "medium" ? "中" : "低"}
                    </Badge>
                    <Badge className={getCategoryColor(stakeholder.category)}>
                      {stakeholder.category === "internal"
                        ? "内部"
                        : stakeholder.category === "external"
                          ? "外部"
                          : stakeholder.category === "customer"
                            ? "客户"
                            : "供应商"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
