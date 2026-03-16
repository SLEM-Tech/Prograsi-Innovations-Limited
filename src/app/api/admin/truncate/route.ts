import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

// DELETE /api/admin/truncate?target=products|categories|all
// Auth: admin cookie OR ?secret=prograsi-truncate-2024
export async function DELETE(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const admin = await requireAdmin(req);
  if (!admin && secret !== "prograsi-truncate-2024") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const target = req.nextUrl.searchParams.get("target") || "all";

  try {
    if (target === "products" || target === "all") {
      await query(
        `TRUNCATE ${T.productAttributes}, ${T.productImages}, ${T.productCategories}, ${T.orderItems}, ${T.products} RESTART IDENTITY CASCADE`,
      );
    }

    if (target === "categories" || target === "all") {
      await query(`TRUNCATE ${T.categories} RESTART IDENTITY CASCADE`);
    }

    return NextResponse.json({ message: `Truncated: ${target}` });
  } catch (error) {
    console.error("Truncate error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
