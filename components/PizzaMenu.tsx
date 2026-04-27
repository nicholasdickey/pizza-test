"use client";

import { useEffect, useState } from "react";
import { isPizzaData } from "@/lib/isPizzaData";
import type { Pizza, PizzaData } from "@/types/pizza";
import { PizzaCard } from "./PizzaCard";

export function PizzaMenu() {
  const [menu, setMenu] = useState<PizzaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<Pizza["id"] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/pizzas");
        const raw: unknown = await res.json();

        if (!res.ok) {
          const msg =
            typeof raw === "object" &&
            raw !== null &&
            "error" in raw &&
            typeof (raw as { error: unknown }).error === "string"
              ? (raw as { error: string }).error
              : `Request failed (${res.status})`;
          if (!cancelled) setError(msg);
          return;
        }

        if (!isPizzaData(raw)) {
          if (!cancelled) setError("Invalid menu data from server.");
          return;
        }

        if (!cancelled) setMenu(raw);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Could not load the pizza menu.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

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

      {loading ? (
        <p className="text-center text-neutral-600" role="status">
          Loading menu…
        </p>
      ) : null}

      {error ? (
        <div
          className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-800"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {!loading && !error && menu ? (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.availablePizzas.map((pizza) => (
            <li key={pizza.id}>
              <PizzaCard
                pizza={pizza}
                availableToppings={menu.availableToppings}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
