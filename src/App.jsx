import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { VesselSearch, VesselCertificates } from "./pages/Index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<VesselSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
