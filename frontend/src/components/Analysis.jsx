import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Analysis = () => {
  const { user } = useAuth();

  const [sentiments, setSentiments] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({
    totalEntries: 0,
    averageScores: {},
    dominantEmotion: '',
    recentTrend: '',
    highestScore: 0,
    lowestScore: 1,
  });

  const [diseaseInput, setDiseaseInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const foodRecommendations = [
    { name: 'Grilled Chicken Salad', image: '/salad.jpg' },
    { name: 'Avocado Toast', image: '/avocado.jpg' },
    { name: 'Fruit Smoothie', image: '/smoothie.jpg' },
    { name: 'Quinoa Bowl', image: '/quinoa.jpg' },
  ];

  useEffect(() => {
    const fetchDiseaseInput = async () => {
      try {
        const docRef = doc(db, 'healthData', 'diseasesInput');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDiseaseInput(docSnap.data().disease || 'No input provided');
        } else {
          setDiseaseInput('No input provided');
        }
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Error fetching from Firebase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseaseInput();
  }, []);

  useEffect(() => {
    if (!user) return;

    const sentimentsRef = collection(db, `users/${user.uid}/sentiments`);
    const sentimentsQuery = query(sentimentsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      sentimentsQuery,
      (snapshot) => {
        try {
          const sentimentData = [];
          snapshot.forEach((doc) => {
            sentimentData.push({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate(),
            });
          });
          setSentiments(sentimentData);
          analyzeData(sentimentData);
          setLoading(false);
        } catch (err) {
          setError('Error fetching sentiment data');
          setLoading(false);
        }
      },
      (err) => {
        setError('Error fetching sentiment data: ' + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const analyzeData = (data) => {
    if (!data.length) return;

    const emotionTotals = {};
    const emotionCounts = {};
    let totalScore = 0;
    let highest = 0;
    let lowest = 1;

    data.forEach((entry) => {
      highest = Math.max(highest, entry.score);
      lowest = Math.min(lowest, entry.score);
      totalScore += entry.score;

      Object.entries(entry.emotions).forEach(([emotion, value]) => {
        emotionTotals[emotion] = (emotionTotals[emotion] || 0) + value;
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    });

    const averageScores = {};
    Object.keys(emotionTotals).forEach((emotion) => {
      averageScores[emotion] = emotionTotals[emotion] / emotionCounts[emotion];
    });

    const dominantEmotion = Object.entries(averageScores)
      .sort(([, a], [, b]) => b - a)[0][0];

    const recentEntries = data.slice(0, 5);
    const trend =
      recentEntries.length > 1
        ? recentEntries[0].score > recentEntries[recentEntries.length - 1].score
          ? 'Improving'
          : 'Declining'
        : 'Not enough data';

    setAnalysisResults({
      totalEntries: data.length,
      averageScores,
      dominantEmotion,
      recentTrend: trend,
      highestScore: highest,
      lowestScore: lowest,
      averageScore: totalScore / data.length,
    });
  };

  if (loading) {
    return <div className="p-8">Loading analysis...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Financial & Wellness Analysis</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overall Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-gray-600">Total Entries</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-gray-600">Recent Trend</p>
            <p className="text-2xl font-bold">Suffering from Diabetes</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-gray-600">Highest Score</p>
            <p className="text-2xl font-bold">80</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-gray-600">Lowest Score</p>
            <p className="text-2xl font-bold">65</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
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
  );
};

export default Analysis;
