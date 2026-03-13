import { Sprout, ShieldCheck, Bell, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
	{
		icon: Sprout,
		title: 'Crop Guidance',
		desc: 'Stage-wise practices to improve yield and sustainability.',
		link: '/notifications'
	},
	{
		icon: ShieldCheck,
		title: 'Disease Detection',
		desc: 'Upload leaf images to simulate detection and receive tips.',
		link: '/detect'
	},

	{
		icon: Bell,
		title: 'Notifications',
		desc: 'Automated alerts based on your planting date.',
		link: '/notifications'
	},
	// {
	// 	icon: UserPlus,
	// 	title: 'Farmer Registration',
	// 	desc: 'Register once to personalize alerts and profile.',
	// 	link: '/register'
	// }
]

export default function Services() {
	return (
		<section className="max-w-6xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900">Services</h2>
			<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((s, idx) => (
					<div key={idx} className="p-6 bg-white rounded-lg shadow-sm border border-emerald-100">
						<div className="flex items-center gap-3">
							<s.icon className="text-farm-green" />
							<h3 className="font-bold text-emerald-900">{s.title}</h3>
						</div>
						<p className="mt-2 text-emerald-800 text-sm">{s.desc}</p>
						{s.link && (
							<Link
								to={s.link}
								className="inline-block mt-3 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
							>
								Learn more →
							</Link>
						)}
					</div>
				))}
			</div>
		</section>
	)
}


