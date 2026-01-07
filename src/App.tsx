import "./App.css";
import Registration from "./pages/registration/Registration";
import Contacts from "./pages/Contacts/Contacts";
import { useState } from "react";

function App() {
  const [page, setpage] = useState("contacts");

  return (
    <>
      {page === "registration" ? (
        <Registration></Registration>
      ) : (
        <Contacts setpage={setpage}></Contacts>
      )}
    </>
  );
}

export default App;
