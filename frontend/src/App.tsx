import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/companies" element={<CompanyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
