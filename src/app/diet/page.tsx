"use client";

import { useState } from "react";
import Link from "next/link";

export default function DietPage() {
  const [meal, setMeal] = useState("早餐");
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meal,
          food,
          calories: calories ? parseInt(calories) : null,
          note: note || null,
        }),
      });

      if (res.ok) {
        setMessage("记录成功！");
        setFood("");
        setCalories("");
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

        <h1 className="text-2xl font-bold text-gray-800 mb-6">🍽️ 饮食记录</h1>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          {/* 餐次选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              餐次
            </label>
            <div className="flex gap-2">
              {["早餐", "午餐", "晚餐", "加餐"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMeal(m)}
                  className={`px-4 py-2 rounded-lg border ${
                    meal === m
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 食物名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              食物 *
            </label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="例如：鸡蛋三明治、米饭..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* 卡路里 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              卡路里（可选）
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="例如：350"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={2}
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={loading || !food.trim()}
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "保存中..." : "记录"}
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
      </main>
    </div>
  );
}
