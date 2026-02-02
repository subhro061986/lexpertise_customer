import { useState } from "react";
import "./App.css";
import Navigation from "./AppRouter";
import LoginModal from "./layout/LoginModal";
import SignUpModal from "./layout/SignupModal";

// temporary
import DisclaimerModal from "./layout/DisclaimerModal";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <>
      <Navigation
        onLoginClick={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
        onSignupClick={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSignupClick={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <SignUpModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onLoginClick={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />

      <DisclaimerModal
        open={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        onAgree={() => {
          setShowDisclaimer(false);
        }}
      />
    </>
  );
}

export default App;
