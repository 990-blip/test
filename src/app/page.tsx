import Link from "next/link";

export default function Home() {
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

        {/* 快速统计 */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 今日概览</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">--</div>
              <div className="text-sm text-gray-500">已记录餐次</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">--</div>
              <div className="text-sm text-gray-500">摄入卡路里</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">--</div>
              <div className="text-sm text-gray-500">距目标</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
