import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // به جای localhost، آدرس IP سرور خودت
      const res = await axios.post('http://192.168.56.10:5000/guess', { number: Number(guess) });
      setMessage(res.data.message);
      setAttempts(res.data.attempts);
      setGuess('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>بازی حدس عدد 🎯</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="عدد خود را وارد کنید"
        />
        <button type="submit">حدس بزن</button>
      </form>
      <p>{message}</p>
      <p>تعداد تلاش‌ها: {attempts}</p>
    </div>
  );
}

export default App;
