"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, Lightbulb, TrendingUp, AlertTriangle, Calendar } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "您好！我是您的AI项目管理助手。我可以帮助您分析项目进度、识别风险、优化资源配置，以及回答各种项目管理相关的问题。请问有什么可以帮助您的吗？",
    timestamp: new Date(),
    suggestions: ["分析当前项目的风险状况", "优化团队资源分配", "制定下周的工作计划", "评估项目进度是否正常"],
  },
]

const quickActions = [
  {
    icon: TrendingUp,
    title: "项目进度分析",
    description: "分析当前项目进度和潜在延期风险",
    prompt: "请分析我们当前项目的进度情况，识别可能的延期风险",
  },
  {
    icon: AlertTriangle,
    title: "风险评估",
    description: "识别和评估项目中的潜在风险",
    prompt: "帮我评估当前项目面临的主要风险，并提供应对建议",
  },
  {
    icon: Calendar,
    title: "里程碑规划",
    description: "制定和优化项目里程碑计划",
    prompt: "帮我制定接下来4周的项目里程碑和关键节点",
  },
  {
    icon: Lightbulb,
    title: "效率优化",
    description: "提供团队效率和流程优化建议",
    prompt: "分析我们团队的工作效率，提供优化建议",
  },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("进度") || input.includes("延期")) {
      return "根据当前项目数据分析，您的项目整体进度为75%，略微领先于计划。但我注意到以下几个需要关注的点：\n\n1. **前端开发模块**：当前进度60%，可能存在2-3天的延期风险\n2. **API集成测试**：依赖第三方服务，建议提前准备备用方案\n3. **用户验收测试**：建议提前与客户沟通，确保测试环境就绪\n\n**建议措施**：\n- 增加前端开发资源投入\n- 与第三方服务商确认服务稳定性\n- 提前准备用户培训材料"
    }

    if (input.includes("风险") || input.includes("问题")) {
      return "基于项目当前状况，我识别出以下主要风险：\n\n**高风险项**：\n🔴 关键开发人员档期冲突（概率：高，影响：高）\n🔴 第三方API稳定性问题（概率：中，影响：高）\n\n**中风险项**：\n🟡 需求变更可能性（概率：中，影响：中）\n🟡 测试环境准备延迟（概率：低，影响：中）\n\n**建议应对策略**：\n1. 建立开发人员备份计划\n2. 实施API监控和告警机制\n3. 建立变更控制流程\n4. 提前协调测试环境资源"
    }

    if (input.includes("里程碑") || input.includes("计划")) {
      return "基于您的项目进展，我为接下来4周制定了以下里程碑计划：\n\n**第1周（1月15-19日）**\n📅 完成前端核心功能开发\n📅 API接口联调测试\n\n**第2周（1月22-26日）**\n📅 用户界面优化完成\n📅 系统集成测试启动\n\n**第3周（1月29-2月2日）**\n📅 用户验收测试\n📅 性能优化和bug修复\n\n**第4周（2月5-9日）**\n📅 最终验收和部署准备\n📅 用户培训和文档交付\n\n每个里程碑都设置了明确的成功标准和检查点。"
    }

    if (input.includes("效率") || input.includes("优化")) {
      return "通过分析团队工作模式，我发现以下优化机会：\n\n**当前效率分析**：\n✅ 代码提交频率：良好\n⚠️ 会议时间占比：偏高（25%）\n⚠️ 任务切换频率：较高\n✅ 团队协作：良好\n\n**优化建议**：\n1. **减少会议时间**：将部分会议改为异步沟通\n2. **任务批处理**：相似任务集中处理，减少上下文切换\n3. **自动化工具**：引入CI/CD流程，减少手动部署时间\n4. **专注时间块**：设置2小时专注工作时间，避免打扰\n\n预计可提升团队效率15-20%。"
    }

    return "感谢您的问题！基于您的项目情况，我建议您可以从以下几个方面来考虑：\n\n1. **项目进度监控**：定期检查关键路径上的任务进展\n2. **风险预警机制**：建立早期预警系统，及时发现潜在问题\n3. **团队沟通优化**：确保信息透明，减少沟通成本\n4. **质量控制**：在每个阶段设置质量检查点\n\n如果您需要更具体的建议，请告诉我更多项目细节。"
  }

  const generateSuggestions = (userInput: string): string[] => {
    const suggestions = ["如何提高团队协作效率？", "制定风险应对预案", "优化项目时间安排", "分析资源配置是否合理"]
    return suggestions.slice(0, 3)
  }

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI项目助手
          </h2>
          <p className="text-muted-foreground">智能分析项目状况，提供专业建议和解决方案</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 快捷操作 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">快捷操作</CardTitle>
              <CardDescription>选择常用的分析和建议功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <div className="flex items-start gap-3">
                    <action.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 对话区域 */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI助手对话
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-muted-foreground">建议的后续问题：</p>
                            <div className="flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-6"
                                  onClick={() => handleSendMessage(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {message.type === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="输入您的问题或需求..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                  />
                  <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">按 Enter 发送消息，Shift + Enter 换行</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
