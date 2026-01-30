import { useState } from "react";
import "./App.css";
import Navigation from "./AppRouter";
import LoginModal from "./layout/LoginModal";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Navigation onLoginClick={() => setLoginOpen(true)} />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}

export default App;
