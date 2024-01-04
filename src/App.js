import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import Navbar from "./layout/Navbar";
import Sidebar from './components/Sidebar';
import EmpList from "./Pages/Employee/EmployeeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmp from "./Pages/Employee/AddEmployee";
import EditEmp from "./Pages/Employee/EditEmployee";
import ViewEmp from "./Pages/Employee/ViewEmployee";
import AddCust from "./Pages/Customer/AddCustomer"
import EditCust from "./Pages/Customer/EditCustomer"
import ViewCust from "./Pages/Customer/ViewCustomer"
import CustList from "./Pages/Customer/CustomerList"
import AddProduct from "./Pages/Product/AddProduct"
import EditProduct from "./Pages/Product/EditProduct"
import Product from "./Pages/Product/ProductList"
import AddPayment from "./Pages/Payment/AddPayments"
import EditPayment from "./Pages/Payment/EditPayments"
import ViewPayment from "./Pages/Payment/ViewPayments"
import Payment from "./Pages/Payment/PaymentList"
import AddCategory from "./Pages/Product/AddCategory"
import Categorylist from "./Pages/Product/CategoryList";
import AddBrand from "./Pages/Product/AddBrand"
import Brandlist from "./Pages/Product/BrandList";
// import ImageUpload from "./Pages/Product/Image/Image";
// import ImageDisplay from "./Pages/Product/Image/ImageDisplay";
// import Delete from "./Pages/Product/Image/imageDelete";
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div>
    </div>
        <Routes>

          <Route exact path="/emp" element={<EmpList />} />
          <Route exact path="/addEmp" element={<AddEmp />} />
          <Route exact path="/editEmp/:id" element={<EditEmp />} />
          <Route exact path="/viewEmp/:id" element={<ViewEmp />} />
          <Route exact path="/viewCust/:id" element={<ViewCust />} />
          <Route exact path="/editCust/:id" element={<EditCust />} />
          <Route exact path="/addCust" element={<AddCust />} />
          <Route exact path="/cust/:id" element={<CustList />} />

          <Route exact path="/productList" element={<Product/>}/>
          <Route exact path="/addProduct" element={<AddProduct/>}/>
          <Route exact path="/editProduct/:id" element={<EditProduct/>}/>    
          <Route exact path="/paymentlist" element={<Payment/>}/>
          <Route exact path="/addPayment" element={<AddPayment/>}/>
          <Route exact path="/editPayment/:id" element={<EditPayment/>}/>
          <Route exact path="/viewPayment/:id" element={<ViewPayment/>}/>
          <Route exact path="/addCategory" element={<AddCategory/>}/>
          <Route exact path="/categorylist" element={<Categorylist/>}/>
          <Route exact path="/addBrand" element={<AddBrand/>}/>
          <Route exact path="/brandlist" element={<Brandlist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
