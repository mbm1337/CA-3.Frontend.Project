import casual from 'casual';

// Create an object for config file
const db = { foods: [] };

for (let i = 1; i <= 10; i++) {
    const food = {};

    food.id = i;
    // Generate a random food name
    food.name = casual.random_element(['Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi', 'Tacos']);

    // Generate random ingredients
    const ingredientsCount = casual.integer(1, 5);
    const ingredients = [];
    for (let j = 0; j < ingredientsCount; j++) {
        ingredients.push(casual.random_element(['Tomato', 'Lettuce', 'Cheese', 'Chicken', 'Beef', 'Fish', 'Rice', 'Avocado']));
    }
    food.ingredients = ingredients;

    // Generate random price between $1 and $20
    food.price = casual.integer(100, 2000) / 100;

    // Assign a category
    food.category = casual.random_element(['Italian', 'American', 'Japanese', 'Mexican']);

    db.foods.push(food);
}

console.log(JSON.stringify(db));
