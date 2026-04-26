"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { calculatePizzaTotal } from "@/lib/calculatePizzaPrice";
import type { Pizza, Size, Topping } from "@/types/pizza";

const SIZES: Size[] = ["Small", "Medium", "Large"];

type PizzaCardProps = {
  pizza: Pizza;
  availableToppings: Topping[];
  isSelected: boolean;
  onSelect: () => void;
};

export function PizzaCard({
  pizza,
  availableToppings,
  isSelected,
  onSelect,
}: PizzaCardProps) {
  const [size, setSize] = useState<Size>("Medium");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(pizza.defaultToppingIds),
  );

  const toggleTopping = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectedToppings = useMemo((): Topping[] => {
    return availableToppings.filter((t) => selectedIds.has(t.id));
  }, [availableToppings, selectedIds]);

  const totalPrice = useMemo(
    () =>
      calculatePizzaTotal(pizza.basePricesBySize, size, selectedToppings),
    [pizza.basePricesBySize, size, selectedToppings],
  );

  const basePrice = pizza.basePricesBySize[size];

  return (
    <article
      onClick={onSelect}
      className={`flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-white shadow-md transition-[border-color,box-shadow] ${
        isSelected
          ? "border-[#006491] shadow-lg ring-2 ring-[#006491]/30"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={pizza.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <header>
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            {pizza.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">
            {pizza.description}
          </p>
        </header>

        <div onClick={(e) => e.stopPropagation()}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#E31837]">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  size === s
                    ? "bg-[#E31837] text-white"
                    : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                }`}
              >
                {s}
                <span className="ml-1 text-xs opacity-90">
                  ${pizza.basePricesBySize[s].toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#E31837]">
            Toppings
          </p>
          <ul className="flex flex-col gap-2">
            {availableToppings.map((t) => {
              const on = selectedIds.has(t.id);
              const add = t.pricesBySize[size];
              return (
                <li key={t.id}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#006491]">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleTopping(t.id)}
                      className="size-4 rounded border-neutral-300 text-[#E31837] focus:ring-[#E31837]"
                    />
                    <span className="flex-1 text-sm text-neutral-800">
                      {t.name}
                    </span>
                    <span className="text-sm font-medium text-neutral-600">
                      +${add.toFixed(2)}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="mt-auto space-y-3 border-t border-neutral-100 pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-baseline justify-between text-sm text-neutral-600">
            <span>Pizza base ({size})</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex items-baseline justify-between text-lg font-bold text-neutral-900">
            <span>Your total</span>
            <span className="text-[#E31837]">${totalPrice.toFixed(2)}</span>
          </div>

          {isSelected ? (
            <button
              type="button"
              className="w-full rounded-lg bg-[#E31837] py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow hover:bg-[#c41430] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31837]"
            >
              Add to Cart
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
