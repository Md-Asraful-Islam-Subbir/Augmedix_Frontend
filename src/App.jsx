import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProductOverview from './pages/ProductOverview/ProductOverview'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import About from './pages/AboutUs/About'
import Resources from './pages/Resources/Resources'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard'
import AppointmentForm from './pages/AppointmentForm/AppointmentForm';
import DoctorPatients from './pages/DoctorPatients/DoctorPatients'
import Appointment from './pages/Appointments/Appointments'
import ViewAppointment from './pages/ViewAppointment/ViewAppointment'
import ReportPage from './pages/ReportPage/ReportPage'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
<Navbar setShowLogin={setShowLogin} />
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/product-overview' element={<ProductOverview/>} />
<Route path='/about-us' element={<About/>} />
<Route path='/resources' element={<Resources/>} />
<Route path="/reset-password/:token" element={<ResetPassword/>} />
<Route path="/admin-dashboard" element={<DoctorDashboard/>} />
<Route path="/appointment-form" element={<AppointmentForm/>} />
<Route path='/doctor-patients' element={<DoctorPatients/>}/>
<Route path='/doctor-appointments' element={<Appointment/>}/>
<Route path='/view-appointment' element={<ViewAppointment/>}/>
<Route path="/report" element={<ReportPage/>} />
</Routes>
<Footer />
    </div>
    </>
  )
}

export default App