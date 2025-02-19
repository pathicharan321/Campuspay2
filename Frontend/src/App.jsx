import {BrowserRouter,Route,Routes} from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import  {Dashboard}  from "../pages/Dashboard";
import { SendMoney } from "../pages/SendMoney";
import {Addmoney} from "../pages/Addmoney";
import PrivateRoute from '../components/PrivateRoute';
import PaymentSuccessPage from "../pages/PaymentSuccesspage";
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/send/:id/:name" element={<PrivateRoute><SendMoney /></PrivateRoute>} />
            <Route path="/add-money" element={<PrivateRoute><Addmoney /></PrivateRoute>} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App