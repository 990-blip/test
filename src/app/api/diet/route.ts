import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meal, food, calories, note } = body;

    if (!meal || !food) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      );
    }

    const diet = await prisma.diet.create({
      data: {
        meal,
        food,
        calories: calories || null,
        note: note || null,
        profileId: 1, // 简化：单用户模式
      },
    });

    return NextResponse.json(diet);
  } catch (error) {
    console.error("创建饮食记录失败:", error);
    return NextResponse.json(
      { error: "创建失败" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const diets = await prisma.diet.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });
    return NextResponse.json(diets);
  } catch (error) {
    console.error("获取饮食记录失败:", error);
    return NextResponse.json(
      { error: "获取失败" },
      { status: 500 }
    );
  }
}
