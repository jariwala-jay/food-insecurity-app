"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialNutrientState = {
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
  fiber: 0,
}

export default function ManageInventory() {
  const [inventory, setInventory] = useState<FoodItem[]>([])
  const [newItem, setNewItem] = useState<Omit<FoodItem, "_id">>({
    item: "",
    quantity: "",
    unit: "",
    expiry: "",
    type: "pantry",
  })
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null)
  const [suggestions, setSuggestions] = useState([])
  const [editSuggestions, setEditSuggestions] = useState([])
  const [pantryNutrients, setPantryNutrients] = useState(initialNutrientState)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem('userId')

  const getInventory = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/inventory?userId=${userId}`)
      console.log('Received inventory:', response.data)
      setInventory(response.data?.items || [])


    } catch (error) {
      console.error("Error fetching inventory:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      getInventory()
    }
  }, [userId])

  const addItem = async () => {
    if (newItem.item && newItem.quantity && newItem.unit && newItem.expiry && newItem.type) {
      try {
        setIsLoading(true)
        const response = await axios.post(`/api/inventory?userId=${userId}`, newItem)
        console.log('Add item response:', response.data)
        setInventory(response.data.items || [])
        setNewItem({ item: '', quantity: '', unit: '', expiry: '', type: 'pantry' })
      } catch (error) {
        console.error("Error adding item:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const updateItem = async () => {
    if (editingItem?._id) {
      try {
        setIsLoading(true)
        console.log('Updating item:', editingItem)
        const response = await axios.put(`/api/inventory?userId=${userId}`, {
          itemId: editingItem._id,
          ...editingItem,
        })
        console.log('Update response:', response.data)

        // Update inventory with the response from the server
        setInventory(prevInventory => 
          prevInventory.map(item =>
            item._id === editingItem._id ? { ...item, ...editingItem } : item
          )
        )
        setEditingItem(null)
        setIsEditing(false)
      } catch (error) {
        console.error("Error updating item:", error)
      } finally {
        setIsLoading(false)
      }
    }
  };


  const removeItem = async (itemId: string) => {
    try {
      setIsLoading(true)
      console.log('Removing item:', { userId, itemId })
      const response = await axios.delete(`/api/inventory?userId=${userId}`, {
        data: { itemId }
      })
      console.log('Delete response:', response.data)
      setInventory(response.data.items || [])
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }
  interface FoodItem {
    _id: string
    item: string
    quantity: string
    expiry: string
    type: "pantry" | "other"
    unit: string
  }
  
  

  // const fetchNutrientData = async (fdcId) => {
  //   try {
  //     const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=dSxE2sOG0hgx5jgXvNkn6rrGKVMvnlsOl1A1Ro2q`)
  //     return {
  //       calories: response.data.foodNutrients.find(nutrient => nutrient.name === "Energy")?.amount || 0,
  //       carbs: response.data.foodNutrients.find(nutrient => nutrient.name === "Carbohydrate, by difference")?.amount || 0,
  //       protein: response.data.foodNutrients.find(nutrient => nutrient.name === "Protein")?.amount || 0,
  //       fat: response.data.foodNutrients.find(nutrient => nutrient.name === "Total lipid (fat)")?.amount || 0,
  //       fiber: response.data.foodNutrients.find(nutrient => nutrient.name === "Fiber, total dietary")?.amount || 0,
  //     }
  //   } catch (error) {
  //     console.error("Error fetching nutrient data:", error)
  //     return null
  //   }
  // }

  const fetchSuggestions = async (searchTerm, isEdit = false) => {
    if (!searchTerm) {
      isEdit ? setEditSuggestions([]) : setSuggestions([])
      return
    }

    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=dSxE2sOG0hgx5jgXvNkn6rrGKVMvnlsOl1A1Ro2q&query=${searchTerm}`
      )

      const uniqueFoods = response.data.foods.reduce((acc, current) => {
        const exists = inventory.some(item => item.item === current.description) ||
                       acc.find(item => item.item === current.description)
        if (!exists) {
          acc.push({ item: current.description, fdcId: current.fdcId })
        }
        return acc
      }, [])

      isEdit ? setEditSuggestions(uniqueFoods.slice(0, 5)) : setSuggestions(uniqueFoods.slice(0, 5))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      isEdit ? setEditSuggestions([]) : setSuggestions([])
    }
  }

  const handleSelectSuggestion = async (foodItem, isEdit = false) => {
    if (isEdit && editingItem) {
      setEditingItem({ ...editingItem, item: foodItem.item })
    } else {
      setNewItem({ ...newItem, item: foodItem.item })
    }
    const nutrientData = await fetchNutrientData(foodItem.fdcId)
    if (nutrientData) {
      setPantryNutrients((prev) => ({
        calories: prev.calories + nutrientData.calories,
        carbs: prev.carbs + nutrientData.carbs,
        protein: prev.protein + nutrientData.protein,
        fat: prev.fat + nutrientData.fat,
        fiber: prev.fiber + nutrientData.fiber,
      }))
    }
    isEdit ? setEditSuggestions([]) : setSuggestions([])
  }

  const startEditing = (item: FoodItem) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const saveEdit = () => {
    if (editingItem) {
      setInventory(inventory.map(item => item._id === editingItem._id ? editingItem : item))
      setIsEditing(false)
      setEditingItem(null)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Manage Inventory</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); addItem(); }}>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Item Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  value={newItem.item}
                  onChange={(e) => {
                    setNewItem({ ...newItem, item: e.target.value });
                    fetchSuggestions(e.target.value);
                  }}
                  placeholder="Enter item name"
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    {suggestions.map((food) => (
                      <Button
                        key={food.fdcId}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => handleSelectSuggestion(food)}
                      >
                        {food.item}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={newItem.unit}
                onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                      <SelectItem value="oz">Ounces (Oz)</SelectItem>
                      <SelectItem value="lb">Pound (lb)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="l">Liters (l)</SelectItem>
                      <SelectItem value="pcs">Pieces</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="date"
                value={newItem.expiry}
                onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Item Type</Label>
              <RadioGroup
                value={newItem.type}
                onValueChange={(value) => setNewItem({ ...newItem, type: value as "pantry" | "other" })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pantry" id="pantry" />
                  <Label htmlFor="pantry">Food Pantry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other Food Item</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="col-span-2 bg-[#f9a156] hover:bg-[#fbcb66]" type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Food Pantry Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {inventory?
                .filter((item) => item.type === "pantry")
                .map((item) => (
                  <InventoryItem
                    key={item._id}
                    item={item}
                    onEdit={() => startEditing(item)}
                    onDelete={() => removeItem(item._id)}
                  />
                ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other Food Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {inventory?
                .filter((item) => item.type === "other")
                .map((item) => (
                  <InventoryItem
                    key={item._id}
                    item={item}
                    onEdit={() => startEditing(item)}
                    onDelete={() => removeItem(item._id)}
                  />
                ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); updateItem();}} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <div className="relative">
                  <Input
                    id="edit-name"
                    value={editingItem.item}
                    onChange={(e) => {
                      setEditingItem({ ...editingItem, item: e.target.value });
                      fetchSuggestions(e.target.value, true);
                    }}
                  />
                  {editSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                      {editSuggestions.map((food) => (
                        <Button
                          key={food.fdcId}
                          variant="ghost"
                          className="w-full justify-start font-normal"
                          onClick={() => handleSelectSuggestion(food, true)}
                        >
                          {food.item}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-unit">Unit</Label>
                  <Select
                    value={editingItem.unit}
                    onValueChange={(value) => setEditingItem({ ...editingItem, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oz">Ounces (Oz)</SelectItem>
                      <SelectItem value="lb">Pound (lb)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="ml">Milliliters (ml)</SelectItem>
                      <SelectItem value="l">Liters (l)</SelectItem>
                      <SelectItem value="pcs">Pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiry">Expiry Date</Label>
                <Input
                  id="edit-expiry"
                  type="date"
                  value={new Date(editingItem.expiry).toISOString().split('T')[0]}
                  onChange={(e) => setEditingItem({ ...editingItem, expiry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Item Type</Label>
                <RadioGroup
                  value={editingItem.type}
                  onValueChange={(value) => setEditingItem({ ...editingItem, type: value as "pantry" | "other" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pantry" id="edit-pantry" />
                    <Label htmlFor="edit-pantry">Food Pantry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="edit-other" />
                    <Label htmlFor="edit-other">Other Food Item</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function InventoryItem({ 
  item, 
  onEdit, 
  onDelete 
}: { 
  item: FoodItem
  onEdit: () => void
  onDelete: () => void 
}) {

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-secondary rounded-lg">
      <div>
        <h3 className="font-semibold">{item.item}</h3>
        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity} {item.unit}
        </p>
        <p className="text-sm text-muted-foreground">
          Expiry: {new Date(item.expiry).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            console.log('Delete clicked for item:', item)
            onDelete()
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
