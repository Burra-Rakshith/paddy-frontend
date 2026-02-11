export const defaultNotifications = [
	{ day: 7, message: 'Germination check 👀 — remove weeds early. | మొలకెత్తిందా చూసుకోండి — మొదటి దశలో కలుపు తీసేయండి.' },

	{ day: 10, message: 'Apply organic fertilizer. | సేంద్రియ ఎరువులు వేయడానికి సరైన సమయం.' },

	{ day: 15, message: 'Apply urea fertilizer 💧 — promotes strong growth. | యూరియా ఎరువు వేయండి — మొక్కలు బలంగా పెరుగుతాయి.' },

	{ day: 20, message: 'First irrigation required. Check for pests 🐛. | మొదటి నీటిపోసం అవసరం — పురుగులు ఉన్నాయా చూడండి.' },

	{ day: 25, message: 'Regular watering recommended. | పంటకు క్రమంగా నీరు పెట్టండి.' },

	{ day: 30, message: 'Monitor crop for leaf diseases. | ఆకులపై వ్యాధులు ఉన్నాయా పరిశీలించండి.' },

	{ day: 40, message: 'Top dressing with nitrogen if needed. | అవసరమైతే నత్రజని ఎరువు టాప్ డ్రెస్‌గా వేయండి.' },

	{ day: 50, message: 'Check for Brown Spot and Blast disease. | బ్రౌన్ స్పాట్, బ్లాస్ట్ వ్యాధులు ఉన్నాయా చూడండి.' },

	{ day: 60, message: 'Flowering stage 🌾 — apply potassium-rich fertilizer. | పువ్వు దశ — పొటాష్ ఎక్కువగా ఉన్న ఎరువు వేయండి.' },

	{ day: 70, message: 'Maintain proper water level and monitor pests. | నీటి మట్టం సరిగా ఉంచి పురుగులు పరిశీలించండి.' },

	{ day: 80, message: 'Grain filling stage — avoid water stress. | గింజలు నిండే దశ — నీటి కొరత లేకుండా చూడండి.' },

	{ day: 90, message: 'Reduce irrigation gradually. | క్రమంగా నీటిపోసే పరిమాణాన్ని తగ్గించండి.' },

	{ day: 100, message: 'Crop maturity stage — prepare harvesting tools. | పంట పరిపక్వ దశ — కోత పరికరాలు సిద్ధం చేసుకోండి.' },

	{ day: 110, message: 'Stop irrigation completely. | పూర్తిగా నీటిపోసం ఆపండి.' },

	{ day: 120, message: 'Harvest time 🚜 — start cutting and storage. | కోత సమయం — కోత ప్రారంభించి నిల్వ చేయండి.' }

]

export function daysSince(dateISO) {
	const start = new Date(dateISO)
	const now = new Date()
	const diffMs = now.getTime() - start.getTime()
	return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export function computeDueNotifications(plantingDateISO, rules = defaultNotifications) {
	if (!plantingDateISO) return []
	const diff = daysSince(plantingDateISO)
	return rules
		.filter(item => diff >= item.day)
		.sort((a, b) => a.day - b.day)
}


