import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import AppLayout from './components/layouts/AppLayout'
import Home from './pages/Home'
import About from './pages/About'
import Oops from './pages/Oops'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about/:username" element={<About />} />
          <Route path="*" element={<Oops />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
