import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Brain, Heart, Scale } from 'lucide-react';

const healthData = [
  { month: 'Jan', score: 65, benchmark: 75 },
  { month: 'Feb', score: 68, benchmark: 75 },
  { month: 'Mar', score: 72, benchmark: 75 },
  { month: 'Apr', score: 75, benchmark: 75 },
  { month: 'May', score: 78, benchmark: 75 },
  { month: 'Jun', score: 82, benchmark: 75 },
];

const foodRecommendations = [
  { name: 'Grilled Chicken Salad', image: '/salad.jpg' },
  { name: 'Avocado Toast', image: '/avocado.jpg' },
  { name: 'Fruit Smoothie', image: '/smoothie.jpg' },
  { name: 'Quinoa Bowl', image: '/quinoa.jpg' },
];

const NutriWealthDashboard = () => {
  const currentScore = 82;
  
  return (
    <div className="w-[95vw] max-w-4xl space-y-6 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[95vw]">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">NutriWealth Health Dashboard</h2>
        </div>
        <div className="p-6">
          {/* Health Score Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg flex items-center space-x-3">
              <Heart className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm text-blue-600">Overall Health</div>
                <div className="text-2xl font-bold">{currentScore}%</div>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg flex items-center space-x-3">
              <Activity className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm text-green-600">Activity Score</div>
                <div className="text-2xl font-bold">78%</div>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-sm text-purple-600">Mental Health</div>
                <div className="text-2xl font-bold">85%</div>
              </div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg flex items-center space-x-3">
              <Scale className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-sm text-orange-600">Finance</div>
                <div className="text-2xl font-bold">76%</div>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#2563eb" name="Your Score" strokeWidth={2} />
                <Line type="monotone" dataKey="benchmark" stroke="#dc2626" name="Threshold" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800">Personalized Recommendations</h3>
            <div className="text-blue-700">
              <ul className="list-disc pl-4 mt-2">
                <li>Increase daily water intake to 8 glasses</li>
                <li>Add 20 minutes of moderate exercise 3 times a week</li>
                <li>Include more leafy greens in your diet</li>
                <li>Schedule regular health check-ups</li>
              </ul>
            </div>
          </div>

          <div className="mb-8 mt-10">
            <h2 className="text-xl font-semibold mb-4">Food Recommendations</h2>
            <h3 className="text-xl font-semibold mb-4">Based on your zipcode & Financial Health Score we suggest you to purchase the following items at this <a className='underline text-blue-600' href="https://maps.app.goo.gl/RTdrVWcbvCcN9sSj7">Walmart</a> near you</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {foodRecommendations.map((food, index) => (
                <div key={index} className="p-4 bg-white rounded shadow text-center">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <p className="text-lg font-semibold">{food.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutriWealthDashboard;