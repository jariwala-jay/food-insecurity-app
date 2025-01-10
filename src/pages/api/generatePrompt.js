import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI("AIzaSyAMI1-RIuv1rcPQsUuBa3LBbkMTogAk9Yo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userInput } = req.body;

      // Destructure user input data
      const {
        age,
        weight,
        gender,
        dietPreference,
        cuisineLikings,
        medicalConditions,
        pantryItems
      } = userInput;

      // Prepare available ingredients from pantryItems
      const availableIngredients = pantryItems
        .filter(item => item.item) // Filter out items with empty names
        .map(item => `${item.item} (${item.quantity} ${item.unit})`); // Include quantity and unit

      // Create a detailed prompt for the Gemini API
      const prompt = `
You are a nutrition and recipe assistant. Based on the user's nutritional needs, available ingredients, and preferences, create a recipe that meets their dietary requirements and tastes. Please structure your response in the following JSON-like format:

{
  "title": "Recipe title",
  "servings": number of servings,
  "prepTime": "Preparation time",
  "cookTime": "Cooking time",
  "ingredients": [
    "Ingredient 1",
    "Ingredient 2",
    "Ingredient 3",
    ...
  ],
  "instructions": [
    "Step 1",
    "Step 2",
    "Step 3",
    ...
  ],
  "medicalConsiderations": [
    "Consideration 1",
    "Consideration 2",
    "Consideration 3",
    ...
  ]
}

Here are the user's details:

- Age: ${age}
- Gender: ${gender}
- Weight: ${weight} kg
- Medical Conditions: ${medicalConditions?.length ? medicalConditions.join(", ") : "None"}
- Dietary Preferences: ${dietPreference?.length ? dietPreference.join(", ") : "None"}
- Available Ingredients: ${availableIngredients.join(", ")}
- Preferred Cuisine: ${cuisineLikings?.length ? cuisineLikings.join(", ") : "Any"}

Please create the recipe in a structured format and ensure that it fits within the dietary requirements, especially for diabetes. Provide clear instructions and ingredient measurements for 4 servings.
`;



      // Call the Gemini API
      const response = await model.generateContent(prompt);

      // Log the entire response for debugging
      console.log('Full Gemini API Response:', JSON.stringify(response, null, 2));

      if (
        response?.response?.candidates?.length > 0 &&
        response.response.candidates[0]?.content?.parts?.[0]?.text
      ) {
        const generatedContent =
          response.response.candidates[0].content.parts[0].text;
        res.status(200).json({ result: generatedContent });

      } else {
        console.error("Unexpected response structure:", response);
        throw new Error("Invalid response structure from Gemini API.");
      }
    } catch (error) {
      console.error('Error while generating content:', error.message);

      // Development fallback: Mock response
      const mockResponse = `
      Here’s a recipe suggestion:
      - Dish: Lentil Soup with Rice
      - Ingredients: Lentils (1 cup), Rice (1 cup), Onions, Garlic, Spices
      - Instructions: Boil lentils and rice with spices, sauté onions and garlic, combine, and serve.
      `;
      res.status(500).json({ error: error.message, mockResult: mockResponse });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
