import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFarmer } from '../context/FarmerContext'
import { getAllFarmers } from '../services/farmerService'
import { useLoading } from '../context/LoadingContext'

export default function Login() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { loginFarmer } = useFarmer()
	const { isLoading, setIsLoading } = useLoading()

	async function handleLogin(e) {
		e.preventDefault()
		setError('')

		setIsLoading(true)
		try {
			const farmers = await getAllFarmers()

			const farmer = farmers.find(f =>
				f.name.toLowerCase() === name.toLowerCase() &&
				f.phone === phone
			)

			if (farmer) {
				loginFarmer(farmer)
				navigate('/profile')
			} else {
				throw new Error('Farmer profile not found. Please check name and phone number.')
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="max-w-md mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900 border-b-2 border-emerald-500 inline-block mb-8 whitespace-nowrap">Farmer Login</h2>
			<form onSubmit={handleLogin} className="mt-6 space-y-5 bg-white p-8 rounded-2xl border border-emerald-100 shadow-xl">
				{error && <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">{error}</div>}

				<div>
					<label className="block text-sm font-semibold text-emerald-800">Farmer Name</label>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						className="mt-1 w-full border border-emerald-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all"
						placeholder="As registered"
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-emerald-800">Phone Number</label>
					<input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						className="mt-1 w-full border border-emerald-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all"
						placeholder="Enter Registered Phone"
					/>
				</div>

				<button
					disabled={isLoading}
					className="w-full py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
				>
					{isLoading ? 'Accessing...' : 'Access Dashboard'}
				</button>

				<div className="pt-4 text-center border-t border-emerald-50">
					<Link to="/admin" className="text-sm font-bold text-emerald-800 hover:text-emerald-600 transition-colors">
						Identify as Administrator?
					</Link>
				</div>
			</form>
		</section>
	)
}
