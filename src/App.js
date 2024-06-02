import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
import About from './component/About';
import React, { useState } from 'react'
import Alert from './component/Alert';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enable", "success");
      document.title = 'Textutils - Light Mode';
    }
    else {
      setMode('dark');
      document.body.style.backgroundColor = '#3d3d3d';
      showAlert("Dark mode has been enable", "success");
      document.title = 'Textutils - Dark Mode';
    }

  }


  return (
    <>
      {/* <Router> */}
        <Navbar title="LogoName" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
        <TextForm mode={mode} showAlert={showAlert} />
          {/* <Routes> */}
            {/* <Route path="/" element={<TextForm mode={mode} showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<TextForm mode={mode} showAlert={showAlert} />} /> */}
          {/* </Routes> */}
        </div>
      {/* </Router> */}
    </>
  );
}

export default App;
