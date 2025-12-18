// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Login"
// import Layout from "./Layout";
// // import Dashboard from "./Dashboard";
// import MainDashboard from "./pages/MainDashboard";
// import Loans from "./pages/Loans";
// import Reports from "./pages/Reports";
// import PaymentHistory from "./pages/PaymentHistory";
// import Settings from "./pages/Settings";
// import Logout from "./pages/Logout";
// import AddBorrower from "./AddBorrower";
// import ProtectedRoute from "./ProtectedRoute";



// function App() {
//   return (

//     <Routes>
//       {/* Login page alag hai (without sidebar) */}
//       <Route path="/" element={<Login />} />

//       {/* Layout ke andar sidebar + content */}


//       <Route path="" element={<Layout />}>
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}

//         <Route path="/maindashboard" element={<MainDashboard />} />
//         <Route path="/loans" element={<Loans />} />
//         <Route path="/reports" element={<Reports />} />
//         <Route path="/payment-history" element={<PaymentHistory />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/add-borrower" element={<AddBorrower />} />


//       </Route>
//     </Routes>

//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import MainDashboard from "./pages/MainDashboard";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";
import PaymentHistory from "./pages/PaymentHistory";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
// import AddBorrower from "./AddBorrower";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🟩 Public Route - Login page (no sidebar) */}
        <Route path="/" element={<Login />} />

        {/* 🟦 Protected Routes - wrapped inside Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* ✅ All routes inside Layout are protected */}
          <Route path="maindashboard" element={<MainDashboard />} />
          <Route path="loans" element={<Loans />} />
          <Route path="reports" element={<Reports />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
          {/* <Route path="add-borrower" element={<AddBorrower />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
