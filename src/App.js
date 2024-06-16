import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registersceen from './screens/Registerscreen';
import Logginscreen from './screens/Logginscreen';
import Profilescreen from './screens/Profilescreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
          <Route path="/register" element={<Registersceen />} />
          <Route path="/login" element={<Logginscreen />} />
          <Route path='/profile' element={<Profilescreen/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
