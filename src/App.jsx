import { useState } from "react";
import "./App.css";
import Navigation from "./AppRouter";
import LoginModal from "./layout/LoginModal";
import SignUpModal from "./layout/SignupModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

function AppContent() {
  // LoginModal is fully controlled by AuthContext so forceLogout()
  // can open it with a message from anywhere in the app
  const { loginModalOpen, closeLoginModal, openLoginModal } = useAuth();
  const [signupOpen, setSignupOpen] = useState(false);

  const openLogin  = () => { setSignupOpen(false); openLoginModal();   };
  const openSignup = () => { closeLoginModal();     setSignupOpen(true); };

  return (
    <>
      <Navigation onLoginClick={openLogin} onSignupClick={openSignup} />

      <LoginModal
        open={loginModalOpen}
        onClose={closeLoginModal}
        onSignupClick={openSignup}
      />

      <SignUpModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onLoginClick={openLogin}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;