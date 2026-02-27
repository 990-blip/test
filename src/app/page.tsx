"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Profile {
  name: string;
  targetWeight: number | null;
  height: number | null;
}

interface DietRecord {
  id: number;
  meal: string;
  food: string;
  calories: number | null;
  date: string;
}

interface WeightRecord {
  id: number;
  value: number;
  date: string;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todayDiets, setTodayDiets] = useState<DietRecord[]>([]);
  const [todayWeight, setTodayWeight] = useState<WeightRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayData();
  }, []);

  const fetchTodayData = async () => {
    try {
      // 获取用户配置
      const profileRes = await fetch("/api/profile");
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      // 获取饮食记录
      const dietRes = await fetch("/api/diet");
      if (dietRes.ok) {
        const diets: DietRecord[] = await dietRes.json();
        // 筛选今天的记录
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayDiets = diets.filter((d) => {
          const date = new Date(d.date);
          date.setHours(0, 0, 0, 0);
          return date.getTime() === today.getTime();
        });
        setTodayDiets(todayDiets);
      }

      // 获取体重记录
      const weightRes = await fetch("/api/weight");
      if (weightRes.ok) {
        const weights: WeightRecord[] = await weightRes.json();
        // 筛选今天的记录
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayWeight = weights.find((w) => {
          const date = new Date(w.date);
          date.setHours(0, 0, 0, 0);
          return date.getTime() === today.getTime();
        });
        setTodayWeight(todayWeight || null);
      }
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 计算今日摄入卡路里总和
  const todayCalories = todayDiets.reduce((sum, d) => sum + (d.calories || 0), 0);

  // 计算距离目标的差距
  const getDistanceToTarget = () => {
    if (!profile?.targetWeight || !todayWeight) return null;
    const diff = todayWeight.value - profile.targetWeight;
    return diff;
  };

  const distanceToTarget = getDistanceToTarget();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 减肥助手
          </h1>
          <p className="text-gray-600 text-lg">
            记录饮食、追踪体重、达成目标
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 饮食记录 */}
          <Link
            href="/diet"
            className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              饮食记录
            </h2>
            <p className="text-gray-600">
              记录每餐食物，追踪卡路里摄入
            </p>
          </Link>

          {/* 体重追踪 */}
          <Link
            href="/weight"
            className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              体重追踪
            </h2>
            <p className="text-gray-600">
              记录体重变化，查看趋势图表
            </p>
          </Link>

          {/* 健康建议 */}
          <Link
            href="/advice"
            className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              健康建议
            </h2>
            <p className="text-gray-600">
              基于数据生成个性化建议
            </p>
          </Link>

          {/* 个人设置 */}
          <Link
            href="/profile"
            className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              个人设置
            </h2>
            <p className="text-gray-600">
              设置目标体重、身高等信息
            </p>
          </Link>
        </div>

        {/* 快速统计 - 今日概览 */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 今日概览</h3>
          {loading ? (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">加载中...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {todayDiets.length}
                </div>
                <div className="text-sm text-gray-500">已记录餐次</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {todayCalories > 0 ? `${todayCalories}` : "--"}
                </div>
                <div className="text-sm text-gray-500">摄入卡路里</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {todayWeight && distanceToTarget !== null ? (
                    <>
                      {distanceToTarget > 0 ? "+" : ""}
                      {distanceToTarget.toFixed(1)} kg
                    </>
                  ) : (
                    "--"
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {todayWeight ? "距目标" : "今日未记录"}
                </div>
              </div>
            </div>
          )}
          {/* 今日体重详情 */}
          {todayWeight && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">今日体重：</span>
                <span className="font-semibold text-gray-800">
                  {todayWeight.value} kg
                </span>
              </div>
              {profile?.targetWeight && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">目标体重：</span>
                  <span className="font-semibold text-gray-800">
                    {profile.targetWeight} kg
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
