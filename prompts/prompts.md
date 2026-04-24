1. In repo root create a Node / React / Vite project. It will be a nodejs BFF with react frontend. This is a job interview hands-on test to create a pizza menu component. So, to start, we create a page, a React component and place the component on the page. In node, add api route to fetch pizzas. Have a shared type definitions file for Pizza, Topping and Size (Large|Medium|Small) types. Also MenuData that combines the array of all available pizzas and the array of all available toppings. It will be returned by the api route.
   - Pizza should have a map of sizes to base prices
   - Each Topping should have a map of sizes to prices.

   Each pizza's total price will be derived per size from the base + topping price.
 
   Also a file with mocks for pizza choices and topping choices that will be used by the api.

---
2. Place fetch call in the effect of the component, treating incoming type as unknown and narrowing it before assiging to state pizzas.

3. Create a visual menu of pizza cards, with size and toppings selectors (with price modifiers0, derived price (base price+toppings+ size modifier) and add to the shopping cart button that appears when the card is selected. Make defaults Medium size and empty toppings - both stored in card state.
4.Ensure a hot reloading dev environment and ngrok-fronted prod environment

5. Add Vitest testing for React and supertest for Express

6. Add Playwright smoke testing.

7. Create github test.yml
