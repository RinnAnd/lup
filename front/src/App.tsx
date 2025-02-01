import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./views/Login";
import Todos from "./views/Todos";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/my-todos" element={<Todos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
