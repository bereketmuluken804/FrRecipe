import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PublicRecipesPage from "./pages/PublicRecipesPage";
import MykitchenPage from "./pages/MykitchenPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

const App = () => {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar /> {/**navbar should be inside broswer router */}
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
						<Route
							path="/recipes/:id"
							element={<RecipeDetailsPage />}
						/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
};

export default App;
