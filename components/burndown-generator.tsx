import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Sparkles, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BurndownChart from "@/components/BurndownChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BurndownGeneratorProps {
  onBack: () => void;
}

// 模拟的燃尽图数据结构
interface GeneratedBurndown {
  projectName: string;
  startDate: string;
  endDate: string;
  initialStoryPoints: number;
  burndownData: { date: string; remaining: number }[];
  recommendations: string[];
}

export default function BurndownGenerator({ onBack }: BurndownGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBurndown, setGeneratedBurndown] = useState<GeneratedBurndown | null>(null);
  const [formData, setFormData] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // If Sunday, go back 6 days to last Monday
    const startDate = new Date(today.setDate(diffToMonday));

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 11); // Add 11 days to get to Friday of the second week (Monday + 11 days = Friday)

    return {
      projectName: "迭代1",
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      initialStoryPoints: "30",
      sprintDuration: "",
    };
  });
  const [activeTab, setActiveTab] = useState("preview");

  const handleGenerate = async () => {
    setIsGenerating(true);

    // 模拟AI生成过程
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const initialPoints = Number(formData.initialStoryPoints);
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    const burndownData: { date: string; remaining: number }[] = [];
    if (start && end && initialPoints > 0) {
      const oneDay = 1000 * 60 * 60 * 24;
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / oneDay) + 1;

      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const remaining = initialPoints - (initialPoints / totalDays) * (i + 1);
        burndownData.push({
          date: currentDate.toISOString().split('T')[0],
          remaining: Math.round(Math.max(0, remaining)), // 确保不为负，并四舍五入
        });
      }
      // 确保最后一点是0
      if (burndownData.length > 0) {
        burndownData[burndownData.length - 1].remaining = 0;
      }
    }

    // 模拟生成的燃尽图数据
    const mockBurndown: GeneratedBurndown = {
      projectName: formData.projectName || "冲刺项目",
      startDate: formData.startDate,
      endDate: formData.endDate,
      initialStoryPoints: initialPoints,
      burndownData: burndownData.length > 0 ? burndownData : [
        { date: formData.startDate, remaining: initialPoints },
        { date: formData.endDate, remaining: 0 },
      ], // 如果动态生成失败，提供一个简单的默认值
      recommendations: [
        "确保每日站会有效进行，及时更新任务状态。",
        "识别并解决任何阻碍，保持团队进度。",
        "定期检查燃尽图趋势，如果偏离理想线，及时调整计划。",
      ],
    };

    setGeneratedBurndown(mockBurndown);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              返回工具箱
            </Button>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI燃尽图生成器</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="preview">预览燃尽图</TabsTrigger>
            <TabsTrigger value="edit">编辑数据</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    项目信息输入
                  </CardTitle>
                  <CardDescription>请详细描述您的项目信息，AI将基于这些信息生成专业的燃尽图</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">项目名称 *</Label>
                    <Input
                      id="projectName"
                      placeholder="例：冲刺迭代S1"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">开始日期</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">结束日期</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialStoryPoints">初始故事点/工作量</Label>
                    <Input
                      id="initialStoryPoints"
                      type="number"
                      placeholder="例如：100"
                      value={formData.initialStoryPoints}
                      onChange={(e) => setFormData({ ...formData, initialStoryPoints: e.target.value })}
                    />
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.projectName || !formData.startDate || !formData.endDate || !formData.initialStoryPoints}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-spin" />
                        AI正在生成燃尽图...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        生成燃尽图
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              <div className="space-y-6">
                {isGenerating && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <TrendingDown className="h-12 w-12 mx-auto text-primary animate-pulse" />
                        <div>
                          <h3 className="font-medium">AI正在分析项目进度</h3>
                          <p className="text-sm text-muted-foreground">正在生成燃尽图和趋势分析...</p>
                        </div>
                        <Progress value={70} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {generatedBurndown && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingDown className="h-5 w-5 text-green-600" />
                          {generatedBurndown.projectName} - 燃尽图
                        </CardTitle>
                        <CardDescription>AI生成的项目燃尽图 - 初始工作量：{generatedBurndown.initialStoryPoints}点</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-muted-foreground">
                          <BurndownChart
                            data={generatedBurndown.burndownData}
                            initialStoryPoints={generatedBurndown.initialStoryPoints}
                          />
                        </div>
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium">燃尽数据:</h4>
                          {generatedBurndown.burndownData.map((data, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{data.date}:</span>
                              <span>{data.remaining} 剩余</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          AI分析建议
                        </CardTitle>
                        <CardDescription>基于燃尽图趋势的专业建议</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {generatedBurndown.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div className="max-w-xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>编辑燃尽数据</CardTitle>
                  <CardDescription>调整燃尽图的实际工作量数据</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="initialStoryPointsEdit">初始故事点/工作量</Label>
                      <Input
                        id="initialStoryPointsEdit"
                        type="number"
                        value={generatedBurndown?.initialStoryPoints || 0}
                        onChange={(e) => {
                          if (generatedBurndown) {
                            setGeneratedBurndown({
                              ...generatedBurndown,
                              initialStoryPoints: Number(e.target.value),
                            });
                          }
                        }}
                      />
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left py-2">日期</th>
                          <th className="text-left py-2">剩余工作量</th>
                          <th className="py-2">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(generatedBurndown?.burndownData || []).map((dataPoint, idx) => (
                          <tr key={idx} className="border-t last:border-b-0">
                            <td className="py-2">
                              <Input
                                type="date"
                                value={dataPoint.date}
                                onChange={(e) => {
                                  const newBurndownData = [...(generatedBurndown?.burndownData || [])];
                                  newBurndownData[idx].date = e.target.value;
                                  setGeneratedBurndown({ ...generatedBurndown!, burndownData: newBurndownData });
                                }}
                                className="w-32"
                              />
                            </td>
                            <td className="py-2">
                              <Input
                                type="number"
                                value={dataPoint.remaining}
                                onChange={(e) => {
                                  const newBurndownData = [...(generatedBurndown?.burndownData || [])];
                                  newBurndownData[idx].remaining = Number(e.target.value);
                                  setGeneratedBurndown({ ...generatedBurndown!, burndownData: newBurndownData });
                                }}
                                className="w-24"
                              />
                            </td>
                            <td className="py-2 text-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const newBurndownData = [...(generatedBurndown?.burndownData || [])];
                                  newBurndownData.splice(idx, 1);
                                  setGeneratedBurndown({ ...generatedBurndown!, burndownData: newBurndownData });
                                }}
                              >删除</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        if (generatedBurndown) {
                          const lastDate = generatedBurndown.burndownData.length > 0
                            ? new Date(generatedBurndown.burndownData[generatedBurndown.burndownData.length - 1].date)
                            : new Date(generatedBurndown.startDate);
                          lastDate.setDate(lastDate.getDate() + 1);
                          setGeneratedBurndown({
                            ...generatedBurndown,
                            burndownData: [
                              ...generatedBurndown.burndownData,
                              {
                                date: lastDate.toISOString().split('T')[0],
                                remaining: generatedBurndown.burndownData.length > 0 ? generatedBurndown.burndownData[generatedBurndown.burndownData.length - 1].remaining : generatedBurndown.initialStoryPoints,
                              },
                            ],
                          });
                        }
                      }}
                    >新增数据点</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 