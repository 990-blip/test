import Link from "next/link";

export default function AdvicePage() {
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

        <h1 className="text-2xl font-bold text-gray-800 mb-6">💡 健康建议</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-center py-8">
            记录更多数据后，这里会生成个性化建议 ✨
          </p>

          {/* 通用建议 */}
          <div className="border-t pt-6 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🌟 通用建议
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                每天保持 7-8 小时睡眠
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                每天饮水 2000ml 以上
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                每周运动 3-4 次，每次 30 分钟以上
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                饮食多样化，控制碳水摄入
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
