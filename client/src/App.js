import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./components/core/admin/Signup";
import Login from "./components/core/auth/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/core/auth/ForgotPassword";
import ResetPassword from "./components/core/auth/ResetPassword";
import NewLeadForm from "./pages/NewLeadForm";
import { useSelector } from "react-redux";
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import MyTeam from "./components/core/admin/MyTeam";
import DashboardLayout from "./components/core/layout/DashboardLayout";
import Destinations from "./components/core/admin/Destinations";
import AllLeads from "./components/core/admin/AllLeads";
import TodaysLeads from "./components/core/admin/TodaysLeads";

function App() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="w-full h-full min-h-screen text-white bg-[#141519]">
            {/* gradient div  */}
            <div className="smallGradient absolute"></div>
            <div className="bigGradient absolute"></div>

            <Routes>
                <Route
                    path="/"
                    element={
                        <OpenRoute>
                            <Home />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/forgotPassword"
                    element={
                        <OpenRoute>
                            <ForgotPassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/resetPassword"
                    element={
                        <OpenRoute>
                            <ResetPassword />
                        </OpenRoute>
                    }
                />
                <Route
                    path="/newLead"
                    element={
                        <OpenRoute>
                            <NewLeadForm />
                        </OpenRoute>
                    }
                />

                <Route
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    {user?.role === "admin" && (
                        <>
                            <Route path="/myteam" element={<MyTeam />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/destinations" element={<Destinations />} />
                            <Route path="/allLeads" element={<AllLeads />} />
                            <Route path="/todaysLeads" element={<TodaysLeads />} />
                            
                        </>
                    )}
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
