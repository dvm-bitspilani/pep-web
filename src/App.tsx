import "./App.css";
import Registration from "./pages/registration/Registration";
import Contacts from "./pages/Contacts/Contacts";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Optional fallback */}
        <Route path="*" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

