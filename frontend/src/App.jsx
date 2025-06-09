import { Route, Routes, useLocation } from "react-router-dom";
import { LogoPage } from "./Pages/LogoPage";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { DeleteUser } from "./Pages/DeleteUser";
import { CreateExpenseForm } from "./Pages/CreateExpenseForm";
import { Logout } from "./Pages/Logout";
import { PageNotFound } from "./Pages/PageNotFound";
import { Navbar } from "./Components/Navbar";
import { TitleSort } from "./Pages/TitleSort";
import { CategorySort } from "./Pages/CategorySort";
import { AmountAscending } from "./Pages/AmountAscending";
import { AmountDescending } from "./Pages/AmountDescending";
import { UpdateExpense } from "./Pages/UpdateExpense";
import { SearchPage } from "./Pages/SearchPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/logout";


  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><LogoPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/delete/user-account" element={<PrivateRoute><DeleteUser /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateExpenseForm /></PrivateRoute>} />
        <Route path="/title-sort" element={<PrivateRoute><TitleSort /></PrivateRoute>} />
        <Route path="/category-sort" element={<PrivateRoute><CategorySort /></PrivateRoute>} />
        <Route path="/price-asc-sort" element={<PrivateRoute><AmountAscending /></PrivateRoute>} />
        <Route path="/price-dsc-sort" element={<PrivateRoute><AmountDescending /></PrivateRoute>} />
        <Route path="/update/:id" element={<PrivateRoute><UpdateExpense /></PrivateRoute>} />
        <Route path="/search/:query" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />

        {/* Other */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
