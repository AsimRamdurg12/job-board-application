import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import CompanyById from "./pages/employee/CompanyById";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/employee/JobsPage";
import CompanyPage from "./pages/employee/CompanyPage";
import JobById from "./pages/employee/JobById";
import useProfile from "./hooks/useProfile";
import UpdateProfile from "./pages/UpdateProfile";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminJobs from "./pages/admin/AdminJobs";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import AdminCompanyById from "./pages/admin/AdminCompanyById";
import AdminJobById from "./pages/admin/AdminJobById";
import ApplicantsByJobId from "./pages/admin/ApplicantsByJobId";

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
        <Route path="/login" element={!authUser ? <Login /> : <HomePage />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <HomePage />} />
        <Route path="/jobs" element={authUser ? <JobsPage /> : <HomePage />} />
        <Route
          path="/companies"
          element={authUser ? <CompanyPage /> : <HomePage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <HomePage />}
        />
        <Route
          path="/profile/update"
          element={authUser ? <UpdateProfile /> : <HomePage />}
        />

        <Route
          path="/job/:id"
          element={authUser ? <JobById /> : <HomePage />}
        />
        <Route
          path="/company/:id"
          element={authUser ? <CompanyById /> : <HomePage />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin/companies"
          element={
            authUser ? (
              <ProtectedRoute>
                <AdminCompanies />
              </ProtectedRoute>
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/admin/jobs"
          element={
            authUser ? (
              <ProtectedRoute>
                <AdminJobs />
              </ProtectedRoute>
            ) : (
              <HomePage />
            )
          }
        />

        <Route
          path="/admin/job/:id"
          element={
            <ProtectedRoute>
              <AdminJobById />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/company/:id"
          element={
            authUser ? (
              <ProtectedRoute>
                <AdminCompanyById />
              </ProtectedRoute>
            ) : (
              <HomePage />
            )
          }
        />

        <Route
          path="/admin/job/:id/applicants"
          element={
            authUser ? (
              <ProtectedRoute>
                <ApplicantsByJobId />
              </ProtectedRoute>
            ) : (
              <HomePage />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
