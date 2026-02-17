import { useState } from "react";
import "./App.css";
import Navigation from "./AppRouter";
import LoginModal from "./layout/LoginModal";
import SignUpModal from "./layout/SignupModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

function AppContent() {
  const { loginModalOpen, openLoginModal, closeLoginModal } = useAuth();
  const [signupOpen, setSignupOpen] = useState(false);

  const openSignup = () => { closeLoginModal(); setSignupOpen(true); };
  const openLogin  = () => { setSignupOpen(false); openLoginModal();  };

  return (
    <>
      <Navigation onLoginClick={openLogin} onSignupClick={openSignup} />

      {/* LoginModal state is owned by AuthContext — opens automatically on 401 or PrivateRoute */}
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