import type { Size, Topping } from "@/types/pizza";

/** Pure total in USD: base for size plus each selected topping at that size. */
export function calculatePizzaTotal(
  basePricesBySize: Record<Size, number>,
  size: Size,
  selectedToppings: Topping[],
): number {
  const base = basePricesBySize[size] ?? 0;
  const toppingsSum = selectedToppings.reduce(
    (sum, t) => sum + (t.pricesBySize[size] ?? 0),
    0,
  );
  return Math.round((base + toppingsSum) * 100) / 100;
}
