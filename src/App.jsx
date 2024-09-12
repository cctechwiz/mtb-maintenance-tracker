import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    if (!userId) {
      navigate('/auth')
    }
  }, [])

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
