"use client"

import { ArrowLeft, Bot, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ComingSoonPlaceholderProps {
  tool: string
  onBack: () => void
}

export default function ComingSoonPlaceholder({ tool, onBack }: ComingSoonPlaceholderProps) {
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
              <Construction className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI{tool}生成器</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Construction className="h-8 w-8 text-primary" />
              功能开发中
            </CardTitle>
            <CardDescription className="text-lg">AI{tool}生成器正在开发中，即将推出</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">我们正在努力开发这个功能，它将很快可用。请稍后再来查看！</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4" />
              <span>由AI驱动的智能项目管理平台</span>
            </div>
            <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回工具箱
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
