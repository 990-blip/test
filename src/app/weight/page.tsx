"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeightRecord {
  id: number;
  value: number;
  date: string;
  note: string | null;
}

export default function WeightPage() {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchWeights();
  }, []);

  const fetchWeights = async () => {
    try {
      const res = await fetch("/api/weight");
      if (res.ok) {
        const data = await res.json();
        setWeights(data);
      }
    } catch (error) {
      console.error("获取体重数据失败:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setLoading(true);
    try {
      const res = await fetch("/api/weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: parseFloat(value),
          note: note || null,
        }),
      });

      if (res.ok) {
        setMessage("记录成功！");
        setValue("");
        setNote("");
        fetchWeights(); // 刷新数据
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("记录失败，请重试");
      }
    } catch {
      setMessage("网络错误，请重试");
    }
    setLoading(false);
  };

  // 准备图表数据（最近30天，按日期升序）
  const chartData = weights
    .slice(0, 30)
    .reverse()
    .map((w) => ({
      date: new Date(w.date).toLocaleDateString("zh-CN", {
        month: "short",
        day: "numeric",
      }),
      weight: w.value,
    }));

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          ← 返回首页
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">⚖️ 体重追踪</h1>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          {/* 体重 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              体重 (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="例如：65.5"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 备注 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              备注（可选）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="任何想记录的内容..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={loading || !value}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "保存中..." : "记录体重"}
          </button>

          {/* 消息提示 */}
          {message && (
            <div
              className={`text-center py-2 rounded ${
                message.includes("成功")
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        {/* 体重趋势图表 */}
        {weights.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📈 体重趋势（最近30天）
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    domain={["dataMin - 1", "dataMax + 1"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 历史记录列表 */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📋 历史记录
          </h2>
          {dataLoading ? (
            <p className="text-gray-500 text-center py-8">加载中...</p>
          ) : weights.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              暂无记录，开始记录你的体重吧！
            </p>
          ) : (
            <div className="space-y-3">
              {weights.map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {record.value} kg
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(record.date)}
                    </span>
                  </div>
                  {record.note && (
                    <p className="text-sm text-gray-600 mt-2">{record.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
