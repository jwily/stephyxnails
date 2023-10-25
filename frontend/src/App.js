import logo from './logo.svg';
import './App.css';

function App() {

  const fetchTest = async () => {
    const response = await fetch('/api/tiers/');
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      return res;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={fetchTest}>Test</button>
      </header>
    </div>
  );
}

export default App;
