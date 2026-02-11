import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<section className="max-w-xl mx-auto px-4 py-16 text-center">
			<h2 className="text-5xl font-extrabold text-emerald-900">404</h2>
			<p className="mt-2 text-emerald-800">The page you’re looking for does not exist.</p>
			<Link to="/" className="inline-block mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
				Back to Home
			</Link>
		</section>
	)
}


