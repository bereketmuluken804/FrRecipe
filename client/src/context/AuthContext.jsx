import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("frRecipe-user");
		return stored ? JSON.parse(stored) : null;
	});

	const [token, setToken] = useState(() => {
		const stored = localStorage.getItem("token");
		return stored ? JSON.parse(stored) : null
	})
	const login = (userData) => {
		setUser(userData.user);
		localStorage.setItem("frRecipe-user", JSON.stringify(userData.user));
		localStorage.setItem("token", JSON.stringify(userData.token))
	};
	const logout = () => {
		setUser(null);
		setToken(null)
		localStorage.removeItem("frRecipe-user");
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
