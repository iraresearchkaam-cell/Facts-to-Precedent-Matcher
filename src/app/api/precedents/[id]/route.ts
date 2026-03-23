import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const precedent = await prisma.precedentCase.findUnique({
      where: { id },
    });

    if (!precedent) {
      return NextResponse.json(
        { error: "Precedent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(precedent);
  } catch (error) {
    console.error("Precedent fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch precedent" },
      { status: 500 }
    );
  }
}
