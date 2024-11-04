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
  
  const medicalConditionsList = [
    'Diabetes', 'Hypertension', 'Celiac Disease', 'Heart Disease', 'Lactose Intolerance', 'High Cholesterol', 'Other',
  ];
  
  const allergiesList = [
    'Peanuts', 'Tree Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Other',
  ];
  
  export default function MedicalConditionsForm({
    formData,
    handleInputChange,
    handleMedicalConditionsChange,
    handleAllergiesChange,
    nextStep
  }) {
    return (
      <>
        <h2 className="text-xl font-semibold my-4 text-gray-700">Medical Diagnosis</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Medical Conditions</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
  
            <TableRow>
              <TableCell>Allergies</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2 className="text-xl font-semibold my-4 text-gray-700">Cooking Details</h2>
        <Table>
              <TableBody>
              <TableRow>
                  <TableCell>Cooking Experience</TableCell>
  
                    <TableCell>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Available Utensils</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="availableUtensils"
                      value={formData.availableUtensils}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Budget</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Food Pantry Schedule</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="foodPantrySchedule"
                      value={formData.foodPantrySchedule}
                      onChange={handleInputChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Available Time for Cooking</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="availableTime"
                      value={formData.availableTime}
                      onChange={handleInputChange}
                    />
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
  