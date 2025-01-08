import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAMI1-RIuv1rcPQsUuBa3LBbkMTogAk9Yo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userInput } = req.body;

      const {
        age,
        weight,
        gender,
        dietPreference,
        cuisineLikings,
        medicalConditions,
        pantryItems,
      } = userInput;

      const availableIngredients = pantryItems
        .filter((item) => item.item)
        .map((item) => item.item);

      const prompt = `
      You are a nutrition and recipe assistant. Based on the user's nutritional needs and available ingredients, create a recipe that satisfies the person's dietary requirements and is in line with their cuisine preferences. Here are the details:

      - Age: ${age}
      - Gender: ${gender}
      - Weight: ${weight} kg
      - Medical Conditions: ${medicalConditions || "None"}
      - Dietary Preferences: ${dietPreference || "None"}
      - Available Ingredients: ${availableIngredients.join(", ")}
      - Preferred Cuisine: ${cuisineLikings.length > 0 ? cuisineLikings.join(", ") : "Any"}

      Please suggest a recipe that can be made using these ingredients. Make sure the recipe provides a balanced nutrient intake for the person, considering their age, gender, and weight. If necessary, suggest any small additions to the ingredients to improve the recipe while staying within the dietary guidelines.

      Also, ensure the recipe fits within the preferred cuisine type.
      `;

      const response = await model.generateContent(prompt);

      console.log("Full Response from Gemini API:", JSON.stringify(response, null, 2));

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
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
