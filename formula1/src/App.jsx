import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header  from "./components/layout/Header.jsx";
import Home from "./pages/Home";
import Drivers from "./pages/Drivers";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;