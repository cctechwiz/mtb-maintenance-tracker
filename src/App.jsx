import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <>
      <Header />
      
      <main className='flex justify-center w-full'>
        <Outlet />
      </main>
    </>
  )
}

export default App
