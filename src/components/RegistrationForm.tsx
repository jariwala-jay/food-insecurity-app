import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';

const popularCuisines = [
  'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'French', 'Greek', 'Spanish',
];

const dietPreferences = [
  'No Preference', 'Vegetarian', 'Pescetarian', 'Vegan', 'Dairy Free', 'Gluten Free', 'Keto', 'Hinduism', 'Islam'
];

const medicalConditionsList = [
  'Diabetes', 'Hypertension', 'Celiac Disease', 'Heart Disease', 'Lactose Intolerance', 'High Cholesterol', 'Other',
];

const allergiesList = [
  'Peanuts', 'Tree Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Other',
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    familyStatus: '',
    age: '',
    weight: '',
    heightFeet: '',
    heightInch: '',
    gender: '',
    cookingExperience: '',
    dietPreference: [],
    cuisineLikings: [],
    medicalConditions: [],
    otherMedicalCondition: '',
    allergies: [],
    otherAllergy: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<{ value: unknown }>, name: string) => {
    const value = e.target.value as string[];
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDietPrefChange = (e) => {
    setFormData({
      ...formData,
      dietPreference: e.target.value,
    });
  };

  const handleCuisineChange = (e) => {
    setFormData({
      ...formData,
      cuisineLikings: e.target.value,
    });
  };

  const handleMedicalConditionsChange = (e) => {
    setFormData({
      ...formData,
      medicalConditions: e.target.value,
    });
  };

  const handleAllergiesChange = (e) => {
    setFormData({
      ...formData,
      allergies: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', formData);
      // Handle success (e.g., redirect to login or dashboard)
      router.push('/loginform'); // Redirect to dashboard
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black py-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Food Precision Rx</h2>

        <TableContainer>
          <Table>
            <TableBody>
              {/* Name */}
              <TableRow>
                <TableCell><InputLabel>Full Name</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                </TableCell>
              </TableRow>

              {/* Email */}
              <TableRow>
                <TableCell><InputLabel>Email Address</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                </TableCell>
              </TableRow>

              {/* Family Status */}
              <TableRow>
                <TableCell><InputLabel>Family Status</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="familyStatus"
                    value={formData.familyStatus}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>

              {/* Age */}
              <TableRow>
                <TableCell><InputLabel>Age</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                  />
                </TableCell>
              </TableRow>

              {/* Weight */}
              <TableRow>
                <TableCell><InputLabel>Weight</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="weight"
                    label="Pound(lb)"
                    value={formData.weight}
                    onChange={handleChange}
                    type="number"
                  />
                </TableCell>
              </TableRow>

              {/* Height */}
              <TableRow>
                <TableCell><InputLabel>Height</InputLabel></TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <TextField
                      name="heightFeet"
                      value={formData.heightFeet}
                      onChange={handleChange}
                      type="number"
                      label="Feet"
                      className="w-1/2"
                    />
                    <TextField
                      name="heightInch"
                      value={formData.heightInch}
                      onChange={handleChange}
                      type="number"
                      label="Inches"
                      className="w-1/2"
                    />
                  </div>
                </TableCell>
              </TableRow>

              {/* Gender */}
              <TableRow>
                <TableCell><InputLabel>Gender</InputLabel></TableCell>
                <TableCell>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
              {/* Cooking Experience */}
              <TableRow>
                  <TableCell>Cooking Experience</TableCell>
  
                    <TableCell>
                    <FormControl fullWidth>
                    <Select
                      fullWidth
                      name="cookingExperience"
                      value={formData.cookingExperience}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="expert">Expert</MenuItem>
                    </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>

              {/* Diet Preferences */}
              <TableRow>
                <TableCell><InputLabel>Diet Preferences</InputLabel></TableCell>
                <TableCell>
                  <FormControl fullWidth>
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
                  </FormControl>
                </TableCell>
              </TableRow>

              {/* Cuisine Likings */}
              <TableRow>
                <TableCell><InputLabel>Cuisine Likings</InputLabel></TableCell>
                <TableCell>
                  <FormControl fullWidth>
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
                  </FormControl>
                </TableCell>
              </TableRow>

              {/* Medical Conditions */}
              <TableRow>
                <TableCell><InputLabel>Medical Conditions</InputLabel></TableCell>
                <TableCell>
                  <FormControl fullWidth>
                  <Select
                  fullWidth
                  multiple
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleMedicalConditionsChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {medicalConditionsList.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      <Checkbox checked={formData.medicalConditions.indexOf(condition) > -1} />
                      <ListItemText primary={condition} />
                    </MenuItem>
                  ))}
                </Select>
                {formData.medicalConditions.includes('Other') && (
                  <TextField
                    fullWidth
                    name="otherMedicalCondition"
                    placeholder="Please specify"
                    value={formData.otherMedicalCondition}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                )}
                  </FormControl>
                </TableCell>
              </TableRow>

          

              {/* Allergies */}
              <TableRow>
                <TableCell><InputLabel>Allergies</InputLabel></TableCell>
                <TableCell>
                  <FormControl fullWidth>
                  <Select
                  fullWidth
                  multiple
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleAllergiesChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {allergiesList.map((allergy) => (
                    <MenuItem key={allergy} value={allergy}>
                      <Checkbox checked={formData.allergies.indexOf(allergy) > -1} />
                      <ListItemText primary={allergy} />
                    </MenuItem>
                  ))}
                </Select>
                {formData.allergies.includes('Other') && (
                  <TextField
                    fullWidth
                    name="otherAllergy"
                    placeholder="Please specify"
                    value={formData.otherAllergy}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                )}
                  </FormControl>
                </TableCell>
              </TableRow>

  

              {/* Password */}
              <TableRow>
                <TableCell><InputLabel>Password</InputLabel></TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
