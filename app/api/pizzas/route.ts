import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isPizzaData } from "@/lib/isPizzaData";
import type { PizzaData } from "@/types/pizza";

async function loadMockPizzas(): Promise<PizzaData> {
  const filePath = path.join(process.cwd(), "pizzaz-mock.json");
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  if (!isPizzaData(raw)) {
    throw new Error("pizzaz-mock.json does not match PizzaData shape");
  }
  return raw;
}

export async function GET() {
  try {
    const data = await loadMockPizzas();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load pizza menu" },
      { status: 500 },
    );
  }
}
