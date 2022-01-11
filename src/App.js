import './App.css';
import Header from './components/Header';
import  Contact from './components/Contact';
import  About from './components/About';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import  Adminpanel from './components/Adminpanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         {/* navbar */}
          <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/Contact" element={<Contact/>}/> 
          <Route path="/About" element={<About/>}/> 
          <Route path="/Adminpanel" element={<Adminpanel/>}/> 

        </Routes>
      </BrowserRouter>
    

    </div>
  );
}
export default App;
