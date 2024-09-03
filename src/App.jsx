import React from 'react'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Main from './components/Main'
import Navbar from './components/Navbar';
const App = () => {
  return (
    
    <div>
      <Router>
        <Routes>
        <Route path='/'  element={<Navbar />}>
        <Route path='/' exact element={<SignIn />}  />
          <Route path='/signup' exact element={<SignUp />}  />
          <Route path='/home' element={<Main />} />
        </Route>
        </Routes>
      </Router>
       <ToastContainer />
    </div>
  )
}

export default App