import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import CustomerD from './components/CustomerD/CustomerD';
import Home from './components/Home/Home';


interface Customer {
  name: string;
  title: string;
  address: string;
}

function App() {

  const [selected, setSelected] = useState<Customer | null>(null);

  return (
    <div className="App">
      <Sidebar onSelected = {setSelected}/>
      {!selected && <Home/>}
      {selected && <CustomerD section = {selected}/>}
    </div>
  );
}

export default App;
