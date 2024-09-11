import { useState } from 'react'
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false)

  return showRegister ? (
    <RegisterForm setShowRegister={setShowRegister} />
  ) : (
    <LoginForm setShowRegister={setShowRegister} />
  )
}

export default Auth