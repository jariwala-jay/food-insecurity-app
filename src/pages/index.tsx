import { useState } from 'react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import MedicalConditionsForm from '../components/MedicalConditionsForm';
import InventoryManagementForm from '../components/InventoryManagementForm';
import SubmitButton from '../components/SubmitButton';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    familyStatus: '',
    age: '',
    weight: '',
    heightFeet: '',
    heightInch: '',
    gender: '',
    dietPreference: [],
    cuisineLikings: [],
    medicalConditions: [],
    otherMedicalCondition: '',
    allergies: [],
    otherAllergy: '',
    pantryItems: [{ item: '', quantity: '' }],
    otherItems: [{ item: '', quantity: '' }],
  });

  const initialNutrientState = {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
  };

  const [step, setStep] = useState(1);
  const [result, setResult] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pantryNutrients, setPantryNutrients] = useState(initialNutrientState);

  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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

  const handlePantryChange = (index, field, value) => {
    const updatedPantryItems = formData.pantryItems.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setFormData({ ...formData, pantryItems: updatedPantryItems });
  };

  const handleOtherChange = (index, field, value) => {
    const updatedOtherItems = formData.otherItems.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setFormData({ ...formData, otherItems: updatedOtherItems });
  };

  const addPantryItem = () => {
    setFormData({
      ...formData,
      pantryItems: [...formData.pantryItems, { item: '', quantity: '' }],
    });
  };

  const addOtherItem = () => {
    setFormData({
      ...formData,
      otherItems: [...formData.otherItems, { item: '', quantity: '' }],
    });
  };
  const mergeHeight = () => {
    const { heightFeet, heightInch } = formData;
    return `${heightFeet || 0}' ${heightInch || 0}"`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedHeight = mergeHeight();
  
  const updatedFormData = {
    ...formData,
    height: combinedHeight,  // storing the merged height in the height field
  };
  
  console.log(updatedFormData);  // Debug: See the form data being submitted
  setSubmitted(true); 
    
    const response = await fetch('/api/generatePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: updatedFormData }),
    });

    const data = await response.json();
    if (response.ok) {
      // Extract the text from the response
      setResult(data.result.response.candidates[0].content.parts[0].text);
      setSubmitted(true); 
    } else {
      // Handle the error response
      console.error(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex justify-center items-center py-10">
    {!submitted ? (
    <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[90%] lg:max-w-[50%]" onSubmit={handleSubmit}>
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Precision Food Rx</h1>
      {step === 1 && (
        <PersonalInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleDietPrefChange={handleDietPrefChange}
          handleCuisineChange={handleCuisineChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <MedicalConditionsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleMedicalConditionsChange={handleMedicalConditionsChange}
          handleAllergiesChange={handleAllergiesChange}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <>
        <InventoryManagementForm
          formData={formData}
          handlePantryChange={handlePantryChange}
          handleOtherChange={handleOtherChange}
          addPantryItem={addPantryItem}
          addOtherItem={addOtherItem}
          nextStep={nextStep}
          pantryNutrients={pantryNutrients}
          setPantryNutrients={setPantryNutrients} 
        />
        <SubmitButton />
        </>
      )}
      
    </form>
    ) : (
    <div style={{ marginTop: '20px' }} className='text-black'>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' , marginLeft:'10px' }}>Suggested Recipe:</h2>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {result.split('\n').map((line, index) => (
            <p key={index} style={{ margin: '10px 15px' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    )}
    
    );
    </div>
  );
}
