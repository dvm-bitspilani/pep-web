import "./App.css";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import Registration from "./pages/registration/Registration";
import Submissions from "./pages/Submissions/Submissions";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Optional fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

