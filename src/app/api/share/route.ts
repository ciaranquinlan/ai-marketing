import { NextRequest, NextResponse } from "next/server";
import { createShare } from "@/lib/share";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, skillName, input, output } = body;

    if (!skillId || !output) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const shareId = await createShare(skillId, skillName, input || {}, output);

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error("Share creation error:", error);
    return NextResponse.json(
      { error: "Failed to create share" },
      { status: 500 }
    );
  }
}
