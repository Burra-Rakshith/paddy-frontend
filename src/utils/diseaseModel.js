// Real API call to the FastAPI backend
export async function detectDisease(file) {
	const formData = new FormData();
	formData.append("image", file);

	// Automatically switch between local and production URLs
	const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
	const BASE_URL = isLocal
		? "http://127.0.0.1:8000"
		: "https://paddy-ml-backend-production.up.railway.app";

	try {
		const response = await fetch(`${BASE_URL}/predict`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error detecting disease:", error);
		return {
			disease: "Error",
			confidence: 0,
			severity: "Unknown",
			tips: {
				en: ["Check if the ML backend is running.", `Ensure the server is accessible at ${BASE_URL}`],
				te: ["ML బ్యాకెండ్ నడుస్తుందో లేదో తనిఖీ చేయండి.", `సర్వర్ ${BASE_URL} వద్ద ఉందో లేదో నిర్ధారించుకోండి`]
			}
		};
	}
}

// Keeping a legacy wrapper if needed for compatibility with components using detectDiseaseSimulated
export async function detectDiseaseSimulated(file) {
	console.warn("detectDiseaseSimulated is deprecated. Use detectDisease for real results.");
	return await detectDisease(file);
}

