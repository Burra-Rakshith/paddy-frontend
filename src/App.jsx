import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Loader from './components/Loader.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import BottomNavbar from './components/BottomNavbar.jsx'
import { useLoading } from './context/LoadingContext.jsx'

// Lazy load pages
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const PaddyDiseasePrediction = lazy(() => import('./pages/PaddyDiseasePrediction.jsx'))
const Notifications = lazy(() => import('./pages/Notifications.jsx'))
const DiseaseDetection = lazy(() => import('./pages/DiseaseDetection.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
	const { isLoading } = useLoading()

	return (
		<div className="min-h-screen flex flex-col relative">
			{/* Global Loading Overlay */}
			{isLoading && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
					<Loader message="Cultivating data..." />
				</div>
			)}

			<Navbar />
			<main className="flex-1 pb-24 md:pb-0">
				<Suspense fallback={
					<div className="h-full flex items-center justify-center py-20">
						<Loader message="Preparing your farm..." />
					</div>
				}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/services" element={<Services />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/paddy-disease-prediction" element={<PaddyDiseasePrediction />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/notifications"
							element={
								<ProtectedRoute>
									<Notifications />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/detect"
							element={
								<ProtectedRoute>
									<DiseaseDetection />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route path="/home" element={<Navigate to="/" replace />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</main>
			<BottomNavbar />
			<footer className="py-6 text-center text-sm text-emerald-900 bg-emerald-50 border-t border-emerald-100">
				© {new Date().getFullYear()} Paddy Assistance
			</footer>
		</div>
	)
}


