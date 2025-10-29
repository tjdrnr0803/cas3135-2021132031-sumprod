import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [InputX, setInputX] = useState('');
  const [InputY, setInputY] = useState('');
  const [sum, setSum] = useState(null);
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);

  const [resultX, setResultX] = useState('');
  const [resultY, setResultY] = useState('');

  const calculate = async () => {

    setError(null);
    setSum(null);
    setProd(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/sumprod?x=${InputX}&y=${InputY}`); // 1개로 통합

      const data = await response.json();

      if (data.type === 'success'){
        setSum(data.sum);
        setProd(data.prod);

        setResultX(InputX);
        setResultY(InputY);

      } else {
        setError(data.message); // 에러 메세지 추가
      }
    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={InputX}
        min="0"
        placeholder="Enter a number for X"
        onChange={e => setInputX(e.target.value)}
      />
      <input
        type="number"
        value={InputY}
        min="0"
        placeholder="Enter a number for Y"
        onChange={e => setInputY(e.target.value)}
      />
      <br />
      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {sum !== null && <p>sum({resultX} + {resultY}) = <strong>{sum}</strong></p>}
        {prod !== null && <p>Product({resultX} * {resultY}) = <strong>{prod}</strong></p>}
      </div>
    </div>
  );
}