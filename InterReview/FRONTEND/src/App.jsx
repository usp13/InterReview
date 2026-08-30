import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import InterviewPage from './pages/InterviewPage.jsx'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SetUserData } from './redux/userSlice.js';
import InterviewHistory from './pages/InterviewHistory.jsx';
import Pricing from './pages/Pricing.jsx';
import InterviewReport from './pages/InterviewReport.jsx';



export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const getUser = async () => {
      
      try {

        const result = await axios.get( backendUrl + '/api/user/current-user' , 
          { withCredentials: true }
        )

        //console.log( result.data )
        dispatch(SetUserData(result.data))

      } 
      catch (error) {
        console.log( error )
        dispatch(SetUserData(null))
      }
    }
    getUser() ; 

  },[dispatch])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory/>} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path='report/:id' element={<InterviewReport/>} />


    </Routes>
  );
}

export default App;