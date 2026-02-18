export default function About() {
	const posters = [
		{
			title: "Stage-wise Guidance",
			description: "Expert tips from sowing to harvest.",
			image: "https://media.licdn.com/dms/image/v2/D562DAQEhN0JqkM25NA/profile-treasury-image-shrink_1920_1920/B56ZxMoIBZJoAc-/0/1770812118479?e=1771855200&v=beta&t=PZ5T_SWejXmzQOhPSszdK5tygtv5hTiIrkk53ERCXlc",
		},
		{
			title: "Disease Detection",
			description: "AI-powered leaf health analysis.",
			image: "https://media.licdn.com/dms/image/v2/D5622AQGFEWmz4j9lLA/feedshare-shrink_1280/B56ZxB5OxrIEAc-/0/1770632048031?e=1772668800&v=beta&t=_V4Gf8l-emsfnpZy6gWzig7HoUjrFAHjn2h4H7g5J4Y",
		},
		{
			title: "Smart Notifications",
			description: "Timely alerts for your crop cycle.",
			image: "https://media.licdn.com/dms/image/v2/D5622AQFuxaeT3WXpQw/feedshare-shrink_1280/B56Zxm03JLIIAc-/0/1771251659642?e=1772668800&v=beta&t=whRWJQI3VXqWiPWuyWJwOBB94uFWm1BMv6ct44_0xBM",
		},
	]

	return (
		<section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-20 px-4">
			<div className="max-w-4xl mx-auto text-center">

				<h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-6 drop-shadow-sm">
					About Paddy Assistance
				</h2>
				<p className="max-w-2xl mx-auto text-lg text-emerald-800 mb-16 leading-relaxed">
					Paddy Assistance empowers farmers with modern technology, providing
					stage-wise crop guidance, AI-driven disease detection, and
					automated notifications to ensure a bountiful harvest.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{posters.map((poster, index) => (
						<div key={index} className="group cursor-pointer">
							<div className="relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.03]">
								<img
									src={poster.image}
									alt={poster.title}
									className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-110"
								/>


								<div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
							<div className="mt-6 text-center">
								<h3 className="text-xl font-bold text-emerald-900 mb-1">
									{poster.title}
								</h3>
								<p className="text-emerald-700 text-sm">
									{poster.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
