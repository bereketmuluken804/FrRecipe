import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("user-recipe");
		return stored ? JSON.parse(stored) : null;
	});

	const login = (userData) => {
		setUser(userData.user);
		localStorage.setItem("user-recipe", JSON.stringify(userData.user));
		localStorage.setItem("token", JSON.stringify(userData.token))
	};
	const logout = () => {
		setUser(null);
		localStorage.removeItem("user-recipe");
		localStorage.removeItem("token");
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
