export default function About() {
	return (
		<section className="max-w-4xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900">About Paddy Assistance</h2>
			<p className="mt-4 text-emerald-800">
				Paddy Assistance brings modern technology to traditional agriculture. It helps
				farmers by providing stage-wise cultivation guidance, timely notifications, and
				disease detection support. With a clean, mobile-first design, farmers can quickly
				register their crop details, receive automated alerts based on planting dates, and
				upload leaf images to simulate disease detection—receiving actionable prevention tips.
			</p>
			<ul className="mt-6 space-y-3 text-emerald-900">
				<li className="p-4 bg-emerald-50 border border-emerald-100 rounded-md">
					<strong>Smart Notifications:</strong> Guidance for irrigation, fertilization, and pest control aligned to crop stages.
				</li>
				<li className="p-4 bg-emerald-50 border border-emerald-100 rounded-md">
					<strong>Disease Detection:</strong> Simulated or ML-driven analysis of leaf images with prevention tips.
				</li>
				<li className="p-4 bg-emerald-50 border border-emerald-100 rounded-md">
					<strong>Local Storage:</strong> Your profile and planting date stay on your device—fast and private.
				</li>
			</ul>
		</section>
	)
}


