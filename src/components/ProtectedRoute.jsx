import { Navigate, useLocation } from 'react-router-dom'
import { useFarmer } from '../context/FarmerContext'

export default function ProtectedRoute({ children }) {
	const { farmerId } = useFarmer()
	const location = useLocation()

	if (!farmerId) {
		return <Navigate to="/login" replace state={{ from: location }} />
	}
	return children
}
