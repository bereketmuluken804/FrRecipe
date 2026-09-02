import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("user-recipe");
		return stored ? JSON.parse(stored) : null;
	});

	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("user-recipe", JSON.stringify(userData));
	};
	const logout = () => {
		setUser(null);
		localStorage.removeItem("user-recipe");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
