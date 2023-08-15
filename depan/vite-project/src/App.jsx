/* eslint-disable react/prop-types */
import { createBrowserRouter, createRoutesFromElements,useNavigate, Route, RouterProvider } from "react-router-dom";
import { useEffect } from 'react';
import LoginPage from "./pages/Login";
import jwtDecode from 'jwt-decode';
import AdminLayout from "./layouts/AdminLayout";
import PageLayout from "./layouts/PageLayout";
import UserLayout from "./layouts/UserLayout";
import Clock from "./pages/UserClock";
import UpdateProfileForm from "./pages/Profile";
import AttendanceAll from "./components/TableAttd";
import DailyTable from "./components/TableDaily";
import AddUser from "./pages/Add";
import UserDaily from "./pages/UserPay";
import MonthlySalary from "./pages/Monthly";

function checkIsAdmin() {
  const loginToken = localStorage.getItem('loginToken');
  if (loginToken) {
    try {
      const decodedToken = jwtDecode(loginToken);
      const role = decodedToken.role;
      return role === 1;
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  }
  return false;
}


function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/user");
    }
  }, [isAdmin, navigate]);

  return <AdminLayout />;
}

function ProtectedUserRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  return <UserLayout />;
}

  function checkIsAuthenticated() {
    const token = localStorage.getItem('loginToken');
    return token !== null;
  }
  
  function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const isAuthenticated = checkIsAuthenticated();
  
    if (!isAuthenticated) {
      navigate('/');
      return null;
    }
  
    return children;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageLayout />}>

        <Route index element={<LoginPage />}/>
        <Route path="profile/:token" element={<UpdateProfileForm />}/>
        <Route path="admin" element={<ProtectedAdminRoute />}>
          <Route index element={<ProtectedRoute><AttendanceAll  /></ProtectedRoute>} /> 
          <Route path="daily" element={<ProtectedRoute><DailyTable  /></ProtectedRoute>} /> 
          <Route path="add" element={<ProtectedRoute><AddUser  /></ProtectedRoute>} /> 
          <Route path="monthly" element={<ProtectedRoute><MonthlySalary  /></ProtectedRoute>} /> 
        </Route>

        <Route path="user" element={<ProtectedUserRoute />}>
          <Route index element={<ProtectedRoute><Clock  /></ProtectedRoute>} /> 
          <Route path="pay" element={<ProtectedRoute><UserDaily  /></ProtectedRoute>} /> 
        </Route>

      </Route>
  )
);

function App() { 
  return <RouterProvider router={router} />;
}

export default App
