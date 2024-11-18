import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Clipboard, Heart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    contact: '',
    
    // Lifestyle
    occupation: '',
    activityLevel: '',
    sleepHours: '',
    stressLevel: '',
    
    // Health History
    existingConditions: [],
    medications: '',
    allergies: '',
    familyHistory: '',
    
    // Diet & Nutrition
    dietType: '',
    mealsPerDay: '',
    waterIntake: '',
    supplements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      existingConditions: checked 
        ? [...prev.existingConditions, name]
        : prev.existingConditions.filter(condition => condition !== name)
    }));
  };

  const conditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 
    'Respiratory Issues', 'Thyroid Problems'
  ];

  return (
    <div className="w-screen max-w-4xl p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[95vw]">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">NutriWealth Registration</h2>
          <div className="flex justify-between items-center mt-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`flex items-center ${num <= step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${num <= step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-24 h-1 ${num < step ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="mt-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clipboard className="w-5 h-5" />
                  Lifestyle Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Activity Level</label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Activity Level</option>
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="very">Very Active</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sleep Hours (per day)</label>
                    <input
                      type="number"
                      name="sleepHours"
                      value={formData.sleepHours}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Income Level(Monthly)</label>
                    <select
                      name="incomeLevel"
                      value={formData.incomeLevel}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Income Range</option>
                      <option value="low">Below $10,000</option>
                      <option value="moderate">$10,000 - $20,000</option>
                      <option value="high">Above $10,000</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Health History
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Existing Conditions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {conditions.map(condition => (
                        <div key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            name={condition}
                            checked={formData.existingConditions.includes(condition)}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          <label className="text-sm">{condition}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Medications</label>
                    <textarea
                      name="medications"
                      value={formData.medications}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Allergies</label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Family History</label>
                    <textarea
                      name="familyHistory"
                      value={formData.familyHistory}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Diet & Nutrition
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Diet Type</label>
                    <select
                      name="dietType"
                      value={formData.dietType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Diet Type</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="nonVegetarian">Non-Vegetarian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meals Per Day</label>
                    <input
                      type="number"
                      name="mealsPerDay"
                      value={formData.mealsPerDay}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Water Intake (glasses/day)</label>
                    <input
                      type="number"
                      name="waterIntake"
                      value={formData.waterIntake}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Supplements</label>
                    <textarea
                      name="supplements"
                      value={formData.supplements}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(prev => prev - 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  onClick={() => setStep(prev => prev + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link to="/analysis">
                <button
                    onClick={() => console.log('Form submitted:', formData)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
                  >
                    Generate Health Profile
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;