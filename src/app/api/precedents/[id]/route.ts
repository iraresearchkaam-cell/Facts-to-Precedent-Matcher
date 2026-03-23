import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

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
