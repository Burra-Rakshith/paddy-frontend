import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerFarmer } from '../services/farmerService'
import { useFarmer } from '../context/FarmerContext'
import { useLoading } from '../context/LoadingContext'

export default function Register() {
	const [name, setName] = useState('')
	const [village, setVillage] = useState('')
	const [phone, setPhone] = useState('')
	const [soilType, setSoilType] = useState('Clay')
	const [season, setSeason] = useState('Kharif')
	const [paddyVariety, setPaddyVariety] = useState('')
	const [sowingDate, setSowingDate] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()
	const { loginFarmer } = useFarmer()
	const { isLoading, setIsLoading } = useLoading()

	async function handleSubmit(e) {
		e.preventDefault()
		setError('')

		if (!name || !village || !phone || !soilType || !season || !paddyVariety || !sowingDate) {
			setError('Please fill in all fields')
			return
		}

		setIsLoading(true)
		try {
			const data = await registerFarmer({
				name,
				village,
				phone,
				soilType,
				season,
				paddyVariety,
				sowingDate
			})

			// Store returned farmer data in Context (not localStorage)
			loginFarmer(data)
			navigate('/profile')
		} catch (err) {
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="max-w-md mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900 text-center">Farmer Registration</h2>
			<form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-lg border border-emerald-100 shadow-sm">
				{error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">{error}</div>}

				<div>
					<label className="block text-sm font-medium text-emerald-800">Farmer Name</label>
					<input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none" placeholder="Enter Full Name" />
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Village</label>
					<input value={village} onChange={e => setVillage(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none" placeholder="Enter Village" />
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Phone Number</label>
					<input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none" placeholder="Enter Phone Number" />
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Soil Type</label>
					<select value={soilType} onChange={e => setSoilType(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
						<option value="Black Soil">Black Soil</option>
						<option value="Red Soil">Red Soil</option>
						<option value="Sandy Soil">Sandy Soil</option>
						<option value="Wet Soil">Wet Soil</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Season</label>
					<select value={season} onChange={e => setSeason(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
						<option value="Kharif">Kharif (Monsoon)</option>
						<option value="Rabi">Rabi (Winter)</option>
						<option value="Summer">Summer</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Paddy Variety</label>
					<input value={paddyVariety} onChange={e => setPaddyVariety(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none" placeholder="e.g. Basmati, IR64" />
				</div>

				<div>
					<label className="block text-sm font-medium text-emerald-800">Sowing Date</label>
					<input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
				</div>

				<button
					disabled={isLoading}
					className="w-full px-4 py-2 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
				>
					{isLoading ? 'Processing...' : 'Register Profile'}
				</button>

				<div className="mt-4 text-center">
					<p className="text-sm text-emerald-700">
						Already registered? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Login here</Link>
					</p>
				</div>
			</form>
		</section>
	)
}
