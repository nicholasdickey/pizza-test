import { NextResponse } from "next/server";
import menu from "@/data/menu.json";
import { isPizzaData } from "@/lib/isPizzaData";
import type { PizzaData } from "@/types/pizza";

function loadMenu(): PizzaData {
  const raw = menu as unknown;
  if (!isPizzaData(raw)) {
    throw new Error("data/menu.json does not match PizzaData shape");
  }
  return raw;
}

export async function GET() {
  try {
    const data = loadMenu();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load pizza menu" },
      { status: 500 },
    );
  }
}
