import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Layout from '../Layout.jsx'
import ChatInterface from './components/ChatInterface.jsx'
import Profile from './components/Profile.jsx'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes >
        <Route path='/' element={<Layout />}>
        <Route index element={<ChatInterface />} />
        <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
