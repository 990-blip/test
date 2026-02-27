"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeightPage() {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("记录失败，请重试");
      }
    } catch {
      setMessage("网络错误，请重试");
    }
    setLoading(false);
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

        {/* 历史记录（占位） */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📈 历史记录
          </h2>
          <p className="text-gray-500 text-center py-8">
            暂无记录，开始记录你的体重吧！
          </p>
        </div>
      </main>
    </div>
  );
}
