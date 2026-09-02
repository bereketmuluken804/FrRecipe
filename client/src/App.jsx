import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PublicRecipesPage from "./pages/PublicRecipesPage";
import MykitchenPage from "./pages/MykitchenPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import "./App.css"
import RecipeFormPage from "./pages/RecipeFormPage";
const App = () => {

	const location = useLocation();
	const hideNavBar = location.pathname === "/login" || location.pathname === "/register";
	return (
		<>
			<AuthProvider>	
					{!hideNavBar && <Navbar />} {/**navbar should be inside broswer router */}
					<Routes>
						<Route path="/" element={<PublicRecipesPage />} />
						<Route
							path="/login"
							element={
								<PublicRoute>
									<LoginPage />
								</PublicRoute>
							}
						/>

						<Route
							path="/register"
							element={
								<PublicRoute>
									<RegisterPage />
								</PublicRoute>
							}
						/>
						<Route
							path="/my-kitchen"
							element={
								<ProtectedRoute>
									<MykitchenPage />
								</ProtectedRoute>
							}
						/>
						<Route path="/my-kitchen/new" element={<ProtectedRoute><RecipeFormPage /></ProtectedRoute>} />
						<Route path="/my-kitchen/edit/:id" element={<ProtectedRoute><RecipeFormPage /></ProtectedRoute>}/>
						<Route
							path="/recipes/:id"
							element={<RecipeDetailsPage />}
						/>
					</Routes>
			</AuthProvider>
		</>
	);
};

export default App;
