import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { FarmerProvider } from './context/FarmerContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<FarmerProvider>
				<LoadingProvider>
					<App />
				</LoadingProvider>
			</FarmerProvider>
		</BrowserRouter>
	</React.StrictMode>
)


