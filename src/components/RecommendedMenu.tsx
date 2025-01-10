import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";

const RecommendedMenu = () => {
  const menuItems = [
    {
      id: 1,
      title: "Oatmeal with Almond Butter and Berries",
      description:
        "High in fiber and antioxidants, providing long-lasting energy and improving digestion.",
      calories: 350,
      mealType: "Breakfast",
      nutrients: { carbs: 45, protein: 12, fats: 14 },
      image:
        "https://media.istockphoto.com/id/1408374876/photo/oatmeal-porridge-bowl-with-berry-fruits-in-female-hands.jpg?s=612x612&w=0&k=20&c=t-nDA76Z8G7aiTw4O6ET55yn-YXj8iA7hFJCkkJzaPw=", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Grilled Chicken Wrap with Avocado and Spinach",
      description:
        "Rich in protein and healthy fats, perfect for muscle recovery and maintaining satiety.",
      calories: 450,
      mealType: "Lunch",
      nutrients: { carbs: 40, protein: 30, fats: 18 },
      image: "https://allweeat.com/wp-content/uploads/2022/08/13-11-scaled.jpg", // Replace with actual image URL
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        p: 4,
        mt: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Recommended Menu
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height: 150, objectFit: "cover" }}
              />
              <CardContent>
                {/* Meal type and calories */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={item.mealType}
                    sx={{
                      backgroundColor:
                        item.mealType === "Breakfast" ? "#DFFFE2" : "#FFF3E0",
                      color: "#555",
                      fontWeight: "bold",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="textSecondary"
                  >
                    {item.calories} kcal
                  </Typography>
                </Box>
                {/* Nutrients */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {Object.entries(item.nutrients).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key.charAt(0).toUpperCase()} ${value}g`}
                      sx={{
                        backgroundColor: "#FBE9E7",
                        color: "#555",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </Box>
                {/* Title */}
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  {item.title}
                </Typography>
                {/* Description */}
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedMenu;
