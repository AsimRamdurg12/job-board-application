import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";

import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import useProfile from "./hooks/useProfile";
import CompanyById from "./pages/CompanyById";

const App = () => {
  const authUser = useProfile();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobs" element={authUser ? <JobsPage /> : <Login />} />
        <Route
          path="/companies"
          element={authUser ? <CompanyPage /> : <Login />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Login />}
        />
        <Route
          path="/company/:id"
          element={authUser ? <CompanyById /> : <Login />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
