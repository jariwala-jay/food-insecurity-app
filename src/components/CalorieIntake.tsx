import React from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

const CalorieIntake = () => {
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
        Calories Intake
      </Typography>
      <Grid container spacing={3}>
        {/* Circular Progress */}
        <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              width: "100%",
              height: "100%",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={67} // Adjust to match the "calories left" calculation
              size={"100%"}
              thickness={5}
              sx={{ color: "#FFA726" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                1240 kcal
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Calories left
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "#E0F7FA",
                    p: 0.5,
                    borderRadius: "8px",
                  }}
                >
                  🍴
                </Box>{" "}
                1750 kcal
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Eaten calories
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "#C8E6C9",
                    p: 0.5,
                    borderRadius: "8px",
                  }}
                >
                  ⏱️
                </Box>{" "}
                510 kcal
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Burned calories
              </Typography>
            </Grid>
          </Grid>

          {/* Macronutrients */}
          {[
            { label: "Carbohydrates", value: 120, total: 325, percentage: 37 },
            { label: "Proteins", value: 70, total: 75, percentage: 93 },
            { label: "Fats", value: 20, total: 44, percentage: 45 },
          ].map((item) => (
            <Box key={item.label} mt={2}>
              <Typography variant="body2" fontWeight="bold">
                {item.value}/{item.total}gr {item.label}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E0E0E0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#76C7C0",
                  },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {item.percentage}%
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalorieIntake;
