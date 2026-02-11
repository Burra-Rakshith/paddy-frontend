import { useState, useEffect } from 'react'
import { useFarmer } from '../context/FarmerContext'
import { computeDueNotifications, defaultNotifications, daysSince } from '../utils/notifications.js'
import { Bell, Volume2, Calendar, RefreshCcw, CheckCircle2 } from 'lucide-react'
import { updateFarmerProfile } from '../services/farmerService'
import { useLoading } from '../context/LoadingContext'
import Loader from '../components/Loader'

export default function Notifications() {
	const { profile, setProfile } = useFarmer()
	const { isLoading, setIsLoading } = useLoading()

	// Dynamic calculation based on MongoDB data
	const dayDiff = profile?.sowingDate ? daysSince(profile.sowingDate) : 0
	const isCycleCompleted = dayDiff >= 120
	const due = computeDueNotifications(profile?.sowingDate, defaultNotifications)

	const [speakingIndex, setSpeakingIndex] = useState(null)
	const [utterance, setUtterance] = useState(null)
	const [isRestarting, setIsRestarting] = useState(false)
	const [newSowingDate, setNewSowingDate] = useState(new Date().toISOString().split('T')[0])
	const [message, setMessage] = useState('')

	useEffect(() => {
		return () => {
			if (utterance) {
				window.speechSynthesis.cancel()
			}
		}
	}, [utterance])

	const isTelugu = (text) => /[\u0C00-\u0C7F]/.test(text)

	const handleSpeak = (message, index) => {
		window.speechSynthesis.cancel()

		if (speakingIndex === index && utterance) {
			setSpeakingIndex(null)
			setUtterance(null)
			return
		}

		const newUtterance = new SpeechSynthesisUtterance(message)
		newUtterance.lang = isTelugu(message) ? 'te-IN' : 'en-US'

		newUtterance.onend = () => {
			setSpeakingIndex(null)
			setUtterance(null)
		}

		window.speechSynthesis.speak(newUtterance)
		setSpeakingIndex(index)
		setUtterance(newUtterance)
	}

	const handleRestart = async (e) => {
		e.preventDefault()
		if (!window.confirm("Are you sure you want to start a new crop cycle?")) return

		setIsLoading(true)
		try {
			const updated = await updateFarmerProfile(profile._id, { sowingDate: newSowingDate })
			setProfile(updated)
			setMessage('New paddy crop cycle started successfully! 🎉')
			setIsRestarting(false)
			setTimeout(() => setMessage(''), 5000)
		} catch (error) {
			setMessage('Error: ' + error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="max-w-3xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900">Crop Notifications</h2>
			{profile?.sowingDate ? (
				<div className="mt-2 text-emerald-800 flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
					<div>
						Sowing date: <span className="font-bold">{new Date(profile.sowingDate).toLocaleDateString()}</span>
					</div>
					<div className="text-lg font-black text-emerald-900">
						Day {dayDiff}
					</div>
				</div>
			) : (
				<p className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-100 text-center">
					No profile registered. Please register your crop details to see alerts.
				</p>
			)}

			{message && (
				<div className="mt-4 p-4 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2 animate-bounce">
					<CheckCircle2 size={20} />
					{message}
				</div>
			)}

			{isCycleCompleted && !isRestarting && (
				<div className="mt-6 p-6 bg-white border-2 border-dashed border-emerald-200 rounded-2xl text-center shadow-sm">
					<div className="flex justify-center mb-3 text-emerald-600">
						<CheckCircle2 size={48} />
					</div>
					<h3 className="text-xl font-bold text-emerald-900">120-Day Crop Cycle Completed!</h3>
					<p className="mt-2 text-emerald-700">Congratulations on completing your paddy harvest cycle.</p>
					<button
						onClick={() => setIsRestarting(true)}
						className="mt-5 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto shadow-md"
					>
						<RefreshCcw size={18} />
						Restart Crop Cycle
					</button>
				</div>
			)}

			{isRestarting && (
				<div className="mt-6 p-6 bg-white border border-emerald-100 rounded-2xl shadow-lg animate-in fade-in zoom-in duration-300">
					<div className="flex items-center gap-2 mb-4 text-emerald-900">
						<Calendar className="text-emerald-600" />
						<h3 className="text-lg font-bold">Start New Cycle</h3>
					</div>
					<form onSubmit={handleRestart} className="space-y-4">
						<div>
							<label className="block text-sm font-semibold text-emerald-800 mb-1">
								New Planting Date
							</label>
							<input
								type="date"
								required
								value={newSowingDate}
								onChange={(e) => setNewSowingDate(e.target.value)}
								className="w-full p-3 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
							/>
						</div>
						<div className="flex gap-3">
							<button
								type="submit"
								disabled={isLoading}
								className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
							>
								{isLoading ? 'Starting...' : 'Confirm Restart'}
							</button>
							<button
								type="button"
								onClick={() => setIsRestarting(false)}
								className="px-6 py-3 border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{!isCycleCompleted && (
				<div className="mt-8 space-y-4">
					{due.length === 0 && profile?.sowingDate && (
						<div className="p-6 bg-white border border-emerald-100 rounded-lg text-emerald-700 text-center">
							Starting your paddy journey! Alerts will appear here as your crop grows.
						</div>
					)}
					{due.map((n, idx) => (
						<div key={idx} className="relative pl-12 group">
							<div className="absolute left-0 top-0 h-full w-0.5 bg-emerald-100 group-last:h-4"></div>
							<div className="absolute left-[-4px] top-1">
								<div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white border-4 border-white shadow-sm">
									<Bell size={14} />
								</div>
							</div>
							<div
								className={`p-5 rounded-xl border transition-all duration-300 ${speakingIndex === idx
									? 'bg-emerald-50 border-emerald-400 shadow-md transform scale-[1.01]'
									: 'bg-white border-emerald-100 hover:border-emerald-300'
									}`}
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1">
										<div className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-1">
											Day {n.day} Alert
										</div>
										<div className="text-emerald-900 leading-relaxed font-medium">{n.message}</div>
									</div>
									<button
										onClick={() => handleSpeak(n.message, idx)}
										className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${speakingIndex === idx
											? 'bg-emerald-600 text-white animate-pulse'
											: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
											}`}
									>
										<Volume2 size={20} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	)
}
