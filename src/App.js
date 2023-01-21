import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'


import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'


function App() {

  return (
    <Router>
      <div className = "container"> 
      <div className = "app">
        <AuthProvider>
          <Header />
          <Routes>
              <Route path='/' element={<PrivateRoute/>}>
                <Route path="/" element={<NotesListPage/>}/>
                <Route path="/note/:id" element={<NotePage />} />
              </Route>
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/verify/" element={<VerifyEmail />} />
          </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}
 
export default App;
