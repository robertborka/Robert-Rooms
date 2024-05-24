import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registersceen from './screens/Registerscreen';
import Logginscreen from './screens/Logginscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid" element={<Bookingscreen />} />
          <Route path="/register" element={<Registersceen />} />
          <Route path="/login" element={<Logginscreen />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
