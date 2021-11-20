import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './containers/Login'
import Photos from './containers/Photos';
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Photos/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
