import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavbarC from "./components/Navbar";
import List from "./pages/List";
import Home from "./pages/Home";
function App() {
  return (
    <div>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list/add" element={<List />} />
      </Routes>
    </div>
  )
}

export default App;