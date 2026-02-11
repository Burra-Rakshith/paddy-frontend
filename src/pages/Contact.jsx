export default function Contact() {
	return (
		<section className="max-w-2xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900">Contact</h2>
			<form className="mt-6 space-y-4 bg-white p-6 rounded-lg border border-emerald-100">
				<div>
					<label className="block text-sm text-emerald-900">Name</label>
					<input className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your name" />
				</div>
				<div>
					<label className="block text-sm text-emerald-900">Email</label>
					<input type="email" className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="you@example.com" />
				</div>
				<div>
					<label className="block text-sm text-emerald-900">Message</label>
					<textarea rows="5" className="mt-1 w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="How can we help?" />
				</div>
				<button type="button" className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
					Send
				</button>
			</form>
		</section>
	)
}


