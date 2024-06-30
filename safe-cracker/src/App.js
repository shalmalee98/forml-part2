// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [combination, setCombination] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      const response = await axios.post('http://localhost:5000/api/crack_safe/', { actual_combination: combination });
      setResult(response.data);
    } catch (error) {
      console.error('There was an error cracking the safe!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Safe Cracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={combination}
            onChange={(e) => setCombination(e.target.value)}
            placeholder="Enter 10-digit combination"
            maxLength="10"
            required
          />
          <button type="submit">Crack Safe</button>
        </form>
        {loading && <p>Cracking the safe...</p>}
        {result && (
          <div>
            <p>Attempts: {result.attempts}</p>
            <p>Time Taken: {result.time_taken} seconds</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;