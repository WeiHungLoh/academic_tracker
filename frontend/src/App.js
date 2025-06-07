import { Routes, Route, useLocation } from 'react-router-dom'
import SignIn from './Authentication/SignIn.js'
import SignUp from './Authentication/SignUp.js'
import Navbar from './Navbar.js'
import AddAssignment from './Assignment/AddAssignment.js'
import ViewAssignment from './Assignment/ViewAssignment.js'
import AddExam from './Exam/AddExam.js'
import ViewExam from './Exam/ViewExam.js'
import ProtectedRoutes from './ProtectedRoutes.js'
import InvalidPage from './InvalidPage.js'

function App() {
  const location = useLocation()
  // Stores all routes except for sign in and sign up
  const navbarRoutes = ['/addassignment', '/viewassignments', '/addexam', '/viewexams']
  const showNavbar = navbarRoutes.includes(location.pathname)

  return (
    <div className='App'>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/addassignment' element={<AddAssignment />} />
            <Route path='/viewassignments' element={<ViewAssignment />} />
            <Route path='/addexam' element={<AddExam />} />
            <Route path='/viewexams' element={<ViewExam />} />
            <Route path='*' element={<InvalidPage />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
