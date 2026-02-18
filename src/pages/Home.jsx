import { Link } from 'react-router-dom'
import { Sprout, Bell, ShieldCheck } from 'lucide-react'

const heroBackground =
	"url('https://png.pngtree.com/thumb_back/fh260/background/20241029/pngtree-ripe-paddy-field-background-image-image_16467542.jpg')"

export default function Home() {
	return (
		<section className="relative">
			<div className="bg-cover bg-center" style={{ backgroundImage: heroBackground }}>
				<div className="hero-overlay">
					<div className="max-w-6xl mx-auto px-4 py-24 md:py-32 text-white">
						<h1 className="text-4xl md:text-6xl font-extrabold drop-shadow">
							Paddy Assistance
						</h1>
						<p className="mt-4 text-lg md:text-2xl max-w-2xl drop-shadow">
							A smart digital assistant for paddy farmers—stage-wise guidance,
							disease detection, and timely notifications to boost productivity.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link to="/register" className="px-5 py-3 bg-farm-yellow text-emerald-900 font-semibold rounded-md hover:opacity-90">
								Get Started
							</Link>
							<Link to="/services" className="px-5 py-3 bg-white/90 text-emerald-900 font-semibold rounded-md hover:bg-white">
								Explore Services
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
				<Link to="/services" className="block p-6 bg-white rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<Sprout className="text-farm-green" />
						<h3 className="font-bold text-emerald-900">Crop Guidance</h3>
					</div>
					<p className="mt-2 text-emerald-800 text-sm">
						Stage-wise best practices from planting to harvest.
					</p>
				</Link>
				<Link to="/detect" className="block p-6 bg-white rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<ShieldCheck className="text-farm-green" />
						<h3 className="font-bold text-emerald-900">Disease Detection</h3>
					</div>
					<p className="mt-2 text-emerald-800 text-sm">
						Upload leaf images to simulate detection and get prevention tips.
					</p>
				</Link>
				<Link to="/notifications" className="block p-6 bg-white rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<Bell className="text-farm-green" />
						<h3 className="font-bold text-emerald-900">Smart Alerts</h3>
					</div>
					<p className="mt-2 text-emerald-800 text-sm">
						Timely notifications based on your planting date.
					</p>
				</Link>
			</div>
		</section>
	)
}


