/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				farm: {
					green: '#16a34a',
					yellow: '#facc15',
					dark: '#14532d'
				}
			},
			backgroundImage: {
				'farm-hero':
					"url('/images/paddy-hero.jpg')"
			}
		}
	},
	plugins: []
}


