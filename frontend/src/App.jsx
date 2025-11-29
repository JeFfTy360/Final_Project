import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Company from './pages/Company';
import Employee from './pages/Employee';
import Search from './pages/Search';
import Booking from './pages/Booking';
import CreateService from './pages/CreateService';
import ManageEmployees from './pages/ManageEmployees';
import ManageSchedule from './pages/ManageSchedule';
import CreatePortfolio from './pages/CreatePortfolio';
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/company/:id" element={<Company />} />
      <Route path="/employee/:id" element={<Employee />} />
      <Route path="/search" element={<Search />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/company/service/create" element={<CreateService />} />
      <Route path="/company/employees" element={<ManageEmployees />} />
      <Route path="/employee/schedule" element={<ManageSchedule />} />
      <Route path="/employee/portfolio" element={<CreatePortfolio />} />
    </Routes>
  );
}

export default App;
