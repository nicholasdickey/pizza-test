export type Size = "Small" | "Medium" | "Large";

export type Topping = {
  id: string;
  name: string;
  /** USD add-on per size */
  pricesBySize: Record<Size, number>;
};

export type Pizza = {
  id: string;
  name: string;
  description: string;
  /** Path or URL to pizza image */
  image: string;
  /** USD base price per size */
  basePricesBySize: Record<Size, number>;
  /** Toppings selected by default, resolved from MenuData.availableToppings */
  defaultToppingIds: Topping["id"][];
};

export type MenuData = {
  availableToppings: Topping[];
  availablePizzas: Pizza[];
};

/** API / menu payload shape (alias of {@link MenuData}). */
export type PizzaData = MenuData;
