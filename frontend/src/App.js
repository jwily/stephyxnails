import logo from './logo.svg';
import './App.css';
import SetForm from '../src/setform_component/index'

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

    <SetForm/>
  
  );
}

export default App;
