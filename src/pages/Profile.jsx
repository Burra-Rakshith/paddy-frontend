import { useFarmer } from '../context/FarmerContext'

export default function Profile() {
	const { profile } = useFarmer()

	return (
		<section className="max-w-3xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900 border-b border-emerald-100 pb-2">Farmer Profile</h2>
			{!profile ? (
				<div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
					<p className="text-emerald-800 font-medium">No profile data available in this session.</p>
					<p className="text-emerald-600 text-sm mt-1">Please register or login to see your profile.</p>
				</div>
			) : (
				<div className="mt-8 bg-white p-8 rounded-xl border border-emerald-100 shadow-sm transition-all hover:shadow-md">
					<div className="grid sm:grid-cols-2 gap-8">
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Farmer Name</div>
							<div className="text-xl font-semibold text-emerald-900">{profile.name}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Village</div>
							<div className="text-xl font-semibold text-emerald-900">{profile.village}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Phone Number</div>
							<div className="text-xl font-semibold text-emerald-900">{profile.phone}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Soil Type</div>
							<div className="text-lg text-emerald-800">{profile.soilType}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Season</div>
							<div className="text-lg text-emerald-800">{profile.season}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Paddy Variety</div>
							<div className="text-lg text-emerald-800">{profile.paddyVariety}</div>
						</div>
						<div className="space-y-1">
							<div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Sowing Date</div>
							<div className="text-lg text-emerald-800">
								{new Date(profile.sowingDate).toLocaleDateString('en-IN', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
