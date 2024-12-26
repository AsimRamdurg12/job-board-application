import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/companies" element={<CompanyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
