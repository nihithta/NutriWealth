import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Analysis from './Analysis';

const diseases = "Suffering from Diabetes";

const ScoreCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    familySize: '',
    zipCode: '',
    incomeRange: '',
    grocerySpending: '',
    diseases: '',
  });

  const [diseaseInput, setDiseaseInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await setDoc(doc(db, 'healthData', 'diseasesInput'), {
        disease: diseaseInput,
      });
      navigate('/analysis');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Calculate Your Score</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Age Input */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your age"
                required
              />
            </div>

            {/* Family Size Input */}
            <div>
              <label htmlFor="familySize" className="block text-sm font-medium text-gray-700">
                Number of People in Family
              </label>
              <input
                id="familySize"
                name="familySize"
                type="number"
                value={formData.familySize}
                onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter family size"
                required
              />
            </div>

            {/* Zip Code Input */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter zip code"
                required
              />
            </div>

            {/* Monthly Income Dropdown */}
            <div>
              <label htmlFor="incomeRange" className="block text-sm font-medium text-gray-700">
                Monthly Income Range
              </label>
              <select
                id="incomeRange"
                name="incomeRange"
                value={formData.incomeRange}
                onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select income range</option>
                <option value="below_10k">Below $10,000</option>
                <option value="10k_20k">$10,000 - $20,000</option>
                <option value="above_20k">Above $20,000</option>
              </select>
            </div>

            {/* Grocery Spending Dropdown */}
            <div>
              <label htmlFor="grocerySpending" className="block text-sm font-medium text-gray-700">
                Monthly Spending on Groceries
              </label>
              <select
                id="grocerySpending"
                name="grocerySpending"
                value={formData.grocerySpending}
                onChange={(e) => setFormData({ ...formData, grocerySpending: e.target.value })}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select spending range</option>
                <option value="below_500">$500 or less</option>
                <option value="500_1000">$500 - $1000</option>
                <option value="above_1000">Above $1000</option>
              </select>
            </div>

            {/* Diseases Input */}
            <div>
              <label htmlFor="diseases" className="block text-sm font-medium text-gray-700">
                Diseases (if any)
              </label>
              <textarea
                id="diseases"
                name="diseases"
                value={diseaseInput}
                onChange={(e) => setDiseaseInput(e.target.value)}
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter any diseases or conditions"
              />
            </div>
          </div>

        <Link
        to="/analysis"
        >
            <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                Calculate Your Score
            </button>
        </Link>
        </form>
        <Analysis diseases={diseases} />
      </div>
    </div>
  );
};

export default ScoreCalculator;
