import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavbarC from "./components/Navbar";
import List from "./pages/List";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Orders from "./pages/Orders";
function App() {
  return (
    <div>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list/add" element={<List />} />
        <Route path="/book/detail/:id" element={<Detail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App;