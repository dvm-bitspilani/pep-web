import "./App.css";
import Registration from "./pages/registration/Registration";
import Contacts from "./pages/Contacts/Contacts";
import { useState, useEffect } from "react";

function App() {
  const routingTable = {
    "/": Registration,
    "/contact": Contacts,
  };

  const Router = () => {
    const [currentUrl, setCurrentUrl] = useState<string>(
      window.location.pathname
    );

    const handleUrlChange = () => {
      setCurrentUrl(window.location.pathname);
    };

    useEffect(() => {
      window.addEventListener("popstate", handleUrlChange);
      return () => {
        window.removeEventListener("popstate", handleUrlChange);
      };
    }, []);

    const CurrentComponent =
      routingTable[currentUrl as keyof typeof routingTable];
    return CurrentComponent ? <CurrentComponent /> : <Registration />;
  };

  return (
    <>
      <Router />
    </>
  );
}

export default App;
