"use client";

import { useState } from "react";
import menuData from "@/data/menu.json";
import type { MenuData, Pizza } from "@/types/pizza";
import { PizzaCard } from "./PizzaCard";

const data = menuData as MenuData;

export function PizzaMenu() {
  const [selectedId, setSelectedId] = useState<Pizza["id"] | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#006491]">
          Hot & fresh
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
          Pizza Menu
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Pick a pie, choose your size (medium by default), and add toppings.
          Tap a card to customize and add to your order.
        </p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.availablePizzas.map((pizza) => (
          <li key={pizza.id}>
            <PizzaCard
              pizza={pizza}
              isSelected={selectedId === pizza.id}
              onSelect={() =>
                setSelectedId((cur) => (cur === pizza.id ? null : pizza.id))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
