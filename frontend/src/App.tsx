import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import CompanyById from "./pages/CompanyById";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import JobById from "./pages/JobById";
import useProfile from "./hooks/useProfile";

const App = () => {
  const { authUser, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

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
        <Route path="/job/:id" element={authUser ? <JobById /> : <Login />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
