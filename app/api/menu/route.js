import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  if (!chain) {
    return Response.json({ error: "Missing chain" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", `${chain}.json`);

  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "Chain not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContents);

  return Response.json(data);
}
