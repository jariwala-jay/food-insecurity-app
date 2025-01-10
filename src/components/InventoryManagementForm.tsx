import { useState, useEffect } from 'react';
import { Grid, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

const initialNutrientState = {
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
  fiber: 0,
};

export default function InventoryManagementForm({
  formData,
  handlePantryChange,
  handleOtherChange,
  addPantryItem,
  addOtherItem
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [pantryNutrients, setPantryNutrients] = useState(initialNutrientState);

  const fetchNutrientData = async (fdcId) => {
    try {
      const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=dSxE2sOG0hgx5jgXvNkn6rrGKVMvnlsOl1A1Ro2q`);
      console.log(response.data.foodNutrients);
      return {
        calories: response.data.foodNutrients.find(nutrient => nutrient.name === "Energy")?.amount || 69,
        carbs: response.data.foodNutrients.find(nutrient => nutrient.name === "Carbohydrate, by difference")?.amount || 0,
        protein: response.data.foodNutrients.find(nutrient => nutrient.name === "Protein")?.amount || 0,
        fat: response.data.foodNutrients.find(nutrient => nutrient.name === "Total lipid (fat)")?.amount || 0,
        fiber: response.data.foodNutrients.find(nutrient => nutrient.name === "Fiber, total dietary")?.amount || 0,
      };
    } catch (error) {
      console.error("Error fetching nutrient data:", error);
      return null;
    }
  };

  const fetchSuggestions = async (searchTerm, type, index) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=dSxE2sOG0hgx5jgXvNkn6rrGKVMvnlsOl1A1Ro2q&query=${searchTerm}`
      );

      const existingItems = type === 'pantry' ? formData.pantryItems : formData.otherItems;
      const uniqueFoods = response.data.foods.reduce((acc, current) => {
        const exists = existingItems.some(item => item.item === current.description) ||
                       acc.find(item => item.item === current.description);
        if (!exists) {
          acc.push({ item: current.description, fdcId: current.fdcId });
        }
        return acc;
      }, []);

      setSuggestions(uniqueFoods.slice(0, 5));
      setActiveField({ type, index });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (index, value, type) => {
    const changeHandler = type === 'pantry' ? handlePantryChange : handleOtherChange;
    changeHandler(index, 'item', value);
    fetchSuggestions(value, type, index);
  };

  const handleSelectSuggestion = async (foodItem) => {
    if (activeField) {
      const { type, index } = activeField;
      const changeHandler = type === 'pantry' ? handlePantryChange : handleOtherChange;
      changeHandler(index, 'item', foodItem.item);
      const nutrientData = await fetchNutrientData(foodItem.fdcId);
      if (nutrientData) {
        setPantryNutrients((prev) => ({
          calories: prev.calories + nutrientData.calories,
          carbs: prev.carbs + nutrientData.carbs,
          protein: prev.protein + nutrientData.protein,
          fat: prev.fat + nutrientData.fat,
          fiber: prev.fiber + nutrientData.fiber,
        }));
      }
      setSuggestions([]);
      setActiveField(null);
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0 || !activeField) return null;

    return (
      <Paper
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto'
        }}
      >
        <List>
          {suggestions.map((food) => (
            <ListItem component="button" key={food.fdcId} onClick={() => handleSelectSuggestion(food)}>
              <ListItemText primary={food.item} />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Inventory Management</h2>

      <h2 className="text-l font-semibold mb-4 text-gray-700">Pantry Items</h2>
      {formData.pantryItems.map((pantry, index) => (
        <Grid container spacing={2} key={index} className="my-2">
          <Grid item xs={4} style={{ position: 'relative' }}>
            <TextField
              label="Food Item"
              name="item"
              value={pantry.item}
              onChange={(e) => handleInputChange(index, e.target.value, 'pantry')}
              fullWidth
            />
            {activeField && activeField.type === 'pantry' && activeField.index === index && renderSuggestions()}
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              name="quantity"
              value={pantry.quantity}
              onChange={(e) => handlePantryChange(index, 'quantity', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Expiry Date"
              name="expiry"
              type="date"
              value={pantry.expiry}
              onChange={(e) => handlePantryChange(index, 'expiry', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => {
        addPantryItem();
        setSuggestions([]);
        setActiveField(null);
      }}>Add Pantry Item</Button>

      <h2 className="text-l font-semibold mb-4 text-gray-700">Other Items</h2>
      {formData.otherItems.map((other, index) => (
        <Grid container spacing={2} key={index} className="my-2">
          <Grid item xs={4} style={{ position: 'relative' }}>
            <TextField
              label="Item"
              name="item"
              value={other.item}
              onChange={(e) => handleInputChange(index, e.target.value, 'other')}
              fullWidth
            />
            {activeField && activeField.type === 'other' && activeField.index === index && renderSuggestions()}
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              name="quantity"
              value={other.quantity}
              onChange={(e) => handleOtherChange(index, 'quantity', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Expiry Date"
              name="expiry"
              type="date"
              value={other.expiry}
              onChange={(e) => handleOtherChange(index, 'expiry', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => {
        addOtherItem();
        setSuggestions([]);
        setActiveField(null);
      }}>Add Other Item</Button>

      {/* <h2 className="text-l font-semibold mb-4 text-gray-700">Nutrient Summary:</h2>
      <div>
        Calories: {pantryNutrients.calories}g / 2000g<br />
        Carbs: {pantryNutrients.carbs}g / 300g<br />
        Protein: {pantryNutrients.protein}g / 50g<br />
        Fat: {pantryNutrients.fat}g / 70g<br />
        Fiber: {pantryNutrients.fiber}g / 25g<br />
      </div> */}
    </>
  );
}
