import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, targetWeight, height } = body;

    if (!name) {
      return NextResponse.json(
        { error: "请输入昵称" },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: {
        name,
        targetWeight: targetWeight || null,
        height: height || null,
      },
      create: {
        id: 1,
        name,
        targetWeight: targetWeight || null,
        height: height || null,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("保存配置失败:", error);
    return NextResponse.json(
      { error: "保存失败" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: 1 },
    });
    return NextResponse.json(profile || { name: "", targetWeight: null, height: null });
  } catch (error) {
    console.error("获取配置失败:", error);
    return NextResponse.json(
      { error: "获取失败" },
      { status: 500 }
    );
  }
}
