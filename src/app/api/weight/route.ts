import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { value, note } = body;

    if (!value || isNaN(value)) {
      return NextResponse.json(
        { error: "请输入有效的体重" },
        { status: 400 }
      );
    }

    const weight = await prisma.weight.create({
      data: {
        value: parseFloat(value),
        note: note || null,
        profileId: 1, // 简化：单用户模式
      },
    });

    return NextResponse.json(weight);
  } catch (error) {
    console.error("创建体重记录失败:", error);
    return NextResponse.json(
      { error: "创建失败" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const weights = await prisma.weight.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });
    return NextResponse.json(weights);
  } catch (error) {
    console.error("获取体重记录失败:", error);
    return NextResponse.json(
      { error: "获取失败" },
      { status: 500 }
    );
  }
}
