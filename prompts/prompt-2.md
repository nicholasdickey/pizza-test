1. Create a NextJS API route /api/pizzas

    Goal: move pizzaz retrieval from hardcoded in UI to the API (route/handler)

    Move the hardcoded JSON to pizzaz-mock.json file.

    Reuse the same type definitions file as the UI in the API.

   

3. Modify PizzaMenu React component to fetch data in its useEffect.

    Handle loading state and add error display using the state var.

4. Use unknown type for fetch data and then narrow the type to PizzaData before assigning into state.

