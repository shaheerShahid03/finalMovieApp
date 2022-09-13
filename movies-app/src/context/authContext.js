import React from "react";

const AuthContext = React.createContext(undefined);

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleAuthChange = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <AuthContext.Provider value={[isAuthenticated, handleAuthChange]}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw Error("useAuthContext must be inside AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuthContext };
