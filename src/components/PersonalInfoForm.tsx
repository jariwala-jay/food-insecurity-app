import {
    TextField,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    ListItemText,
    Button
  } from '@mui/material';
  
  const popularCuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'French', 'Greek', 'Spanish',
  ];
  
  const dietPreferences = [
    'No Preference', 'Vegetarian', 'Pescetarian', 'Vegan', 'Dairy Free', 'Gluten Free', 'Keto', 'Hinduism', 'Islam'
  ];
  
  export default function PersonalInfoForm({ formData, handleInputChange, handleDietPrefChange, handleCuisineChange, nextStep }) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Information</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Single/Family</TableCell>
              <TableCell>
                <Select
                  fullWidth
                  name="familyStatus"
                  value={formData.familyStatus}
                  onChange={handleInputChange}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Weight (lb)</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell className="flex flex-row">
                <TextField
                  fullWidth
                  type="number"
                  name="heightFeet"
                  placeholder="Feet"
                  value={formData.heightFeet}
                  onChange={handleInputChange}
                />
                <TextField
                  className="ml-4"
                  fullWidth
                  placeholder="Inch"
                  type="number"
                  name="heightInch"
                  value={formData.heightInch}
                  onChange={handleInputChange}
                />
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>
                <Select
                  fullWidth
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Diet Preference</TableCell>
              <TableCell>
                <Select
                  fullWidth
                  multiple
                  value={formData.dietPreference}
                  onChange={handleDietPrefChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {dietPreferences.map((diet) => (
                    <MenuItem key={diet} value={diet}>
                      <Checkbox checked={formData.dietPreference.indexOf(diet) > -1} />
                      <ListItemText primary={diet} />
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Cuisine Likings</TableCell>
              <TableCell>
                <Select
                  fullWidth
                  multiple
                  value={formData.cuisineLikings}
                  onChange={handleCuisineChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {popularCuisines.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine}>
                      <Checkbox checked={formData.cuisineLikings.indexOf(cuisine) > -1} />
                      <ListItemText primary={cuisine} />
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="text-right mt-4">
        <Button 
        variant="contained"
        color="primary"
        onClick={nextStep}>Next</Button>
        </div>
      </>
    );
  }
  