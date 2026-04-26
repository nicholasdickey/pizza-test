import type { Pizza, PizzaData, Size, Topping } from "@/types/pizza";

const SIZES: Size[] = ["Small", "Medium", "Large"];

function isSizeRecord(value: unknown): value is Record<Size, number> {
  if (value === null || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return SIZES.every((s) => typeof r[s] === "number");
}

function isTopping(value: unknown): value is Topping {
  if (value === null || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.name === "string" &&
    isSizeRecord(t.pricesBySize)
  );
}

function isPizza(value: unknown): value is Pizza {
  if (value === null || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    typeof p.description === "string" &&
    typeof p.image === "string" &&
    isSizeRecord(p.basePricesBySize) &&
    Array.isArray(p.defaultToppingIds) &&
    p.defaultToppingIds.every((id) => typeof id === "string")
  );
}

export function isPizzaData(value: unknown): value is PizzaData {
  if (value === null || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (!Array.isArray(v.availableToppings) || !Array.isArray(v.availablePizzas)) {
    return false;
  }
  if (!v.availableToppings.every(isTopping) || !v.availablePizzas.every(isPizza)) {
    return false;
  }

  const toppingIds = new Set(v.availableToppings.map((t) => t.id));
  return v.availablePizzas.every((pizza) =>
    pizza.defaultToppingIds.every((id) => toppingIds.has(id)),
  );
}
