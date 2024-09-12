import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);
  
  // Upon refresh, check if user session exists
  const sessionCheck = async () => {
    // Call server to see if userId is saved in session
    const res = await axios.get('/api/session-check');
    
    if (res.data.success) {
      // If userId was in session, dispatch userId from response to Redux store
      dispatch({
        type: 'USER_AUTH',
        payload: res.data.userId
      })
    } else {
      // If no userId was in session, navigate to login page
      navigate('/auth')
    };
  };
  
  useEffect(() => {
    sessionCheck();
  }, []);

  return (
    <>
      MTB Maintenance Tracker
      <Header />
      
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
