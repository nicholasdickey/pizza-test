1. Create a Node / Nextjs/ React / Typescript/Tailwind project in the repo root.

    Goal: create basic project structure
use: npm install -g npx
npx create next-app
No src dir.

2. Create a React Pizza Menu component
Goal: add React Pizza Menu UI - a list of pizzaz, use hardcoded JSON for the data.
Create a types dir and place type definitions for Size (Small|Medium|Large), Topping (includes a map of size: toppingPrice), Pizza (includes Topping[], a map of base prices in USD mapped to size, name, description, image). Hardcoded JSON will have available Topping[] and available Pizza[].
Use Domino's as a style guide.

3. Create a Pizza Card component
Goal create a PizzaCard component.
Will show size selection, base price based on size selection (default Medium), Toppings multi-selection and derived total price.
When a menu item is selected, show the "Add to Cart" button. 

