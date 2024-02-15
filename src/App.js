import logo from './logo.svg'; // You can remove this line if you're not using the logo
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className="App-title">ACEP Capstone UI</h1>
      <img src="acep-logo.png" className="App-logo" alt="ACEP Logo" />
      <button onClick={() => { 
          // Navigate to the new page
          window.location.href = 'https://www.google.com';
      }}>Begin Search</button>
      </header>
    </div>
  );
}

export default App;
