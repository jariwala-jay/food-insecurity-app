import React, { useState } from 'react';
import { Button } from '@mui/material';

const RecipeGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
  
    const userData = {
      age: 30,
      weight: 70,
      gender: 'Male',
      dietPreference: ['Vegetarian'],
      cuisineLikings: ['Indian', 'Mediterranean'],
      medicalConditions: ['Diabetes'],
      pantryItems: [
        { item: 'rice', quantity: 500, unit: 'grams', expiry: '2025-01-10', type: 'grain' },
        { item: 'lentils', quantity: 300, unit: 'grams', expiry: '2025-01-15', type: 'protein' },
        { item: 'tomato', quantity: 5, unit: 'pieces', expiry: '2025-01-08', type: 'vegetable' }
      ]
    };
  
    try {
      const response = await fetch('/api/generatePrompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: userData })
      });
  
      if (!response.ok) throw new Error('Failed to generate recipe');
      const data = await response.json();
  
      // Log the raw data.result before modifying it
      console.log('Raw result:', data.result);
  
      // Strip the unwanted "```json" wrapper and parse the inner JSON
      const recipeDataString = data.result.replace(/^```json\n|```$/g, '').trim(); // Remove backticks and extra spaces/newlines

    
  
      // Log the cleaned string to check for any issues
      console.log('Cleaned result:', recipeDataString.slice(0,-3));
  
      // Parse the cleaned JSON string
      const recipeData = JSON.parse(recipeDataString);
  
      // Check if recipeData is an object and contains the necessary fields
      if (recipeData && typeof recipeData === 'object') {
        setRecipe(recipeData);  // Store structured recipe data
      } else {
        throw new Error('Invalid recipe data format');
      }
    } catch (error) {
      console.error(error);
      setRecipe('An error occurred while generating the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const renderList = (items: any[]) => {
    if (!items || items.length === 0) return <p>No items available</p>;
    return (
      <ul className="list-disc pl-6 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-800">{item}</li>
        ))}
      </ul>
    );
  };

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Recipe Generator</h1>
        {/* <Button onClick={handleGenerateRecipe} className='bg-[#f9a156]' disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </Button> */}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      Debugging: Make sure recipe.title exists
      <h1>{recipe.title || 'No title available'}</h1>

      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <div className="flex justify-between">
          <span className="font-medium">Servings:</span>
          <span>{recipe.servings || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Prep Time:</span>
          <span>{recipe.prepTime || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Cook Time:</span>
          <span>{recipe.cookTime || 'N/A'}</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Ingredients</h2>
      {renderList(recipe.ingredients)}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Instructions</h2>
      {renderList(recipe.instructions)}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Medical Considerations</h2>
      {renderList(recipe.medicalConsiderations)}
    </div>
  );
};

export default RecipeGenerator;
