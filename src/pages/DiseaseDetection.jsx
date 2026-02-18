import { useState } from 'react'
import { detectDisease } from '../utils/diseaseModel.js'
import Loader from '../components/Loader'
import { Upload, Camera, CheckCircle, AlertTriangle, Volume2 } from 'lucide-react'
import { useLoading } from '../context/LoadingContext'

export default function DiseaseDetection() {
	const [file, setFile] = useState(null)
	const [preview, setPreview] = useState('')
	const { isLoading, setIsLoading } = useLoading()
	const [result, setResult] = useState(null)

	function handleFile(e) {
		const f = e.target.files?.[0]
		setFile(f || null)
		setResult(null)
		if (f) {
			const url = URL.createObjectURL(f)
			setPreview(url)
		} else {
			setPreview('')
		}
	}

	async function handleDetect() {
		if (!file) return
		setIsLoading(true)
		setResult(null)
		try {
			const res = await detectDisease(file)
			setResult(res)
		} catch (error) {
			console.error("Detection failed:", error)
		} finally {
			setIsLoading(false)
		}
	}

	function speakResult() {
		if (!result) return

		const textToSpeak = `Detected Disease: ${result.disease}. Prevention Tips: ${result.tips.en.join('. ')}`
		const utterance = new SpeechSynthesisUtterance(textToSpeak)

		// Attempt to set a Telugu voice if Telugu text is spoken (though we are speaking EN here for now)
		// If we wanted to speak Telugu tips:
		// const teluguText = `వ్యాధి: ${result.disease}. నివారణ చిట్కాలు: ${result.tips.te.join('. ')}`

		const voices = window.speechSynthesis.getVoices()
		const teluguVoice = voices.find(v => v.lang === 'te-IN')
		if (teluguVoice && result.tips.te) {
			// If we wanted to switch to Telugu speech
			// utterance.text = teluguText
			// utterance.voice = teluguVoice
		}

		window.speechSynthesis.speak(utterance)
	}


	// Updated speak function to handle Telugu if we want to add that feature later or if requested.
	// For now, implementing standard English speech.

	const diseaseNamesTe = {
		'Bacterial Leaf Blight': 'బ్యాక్టీరియల్ లీఫ్ బ్లైట్ (ఎండు తెగులు)',
		'Brown Spot': 'బ్రౌన్ స్పాట్ (ఆకుమచ్చ తెగులు)',
		'Leaf Blast': 'లీఫ్ బ్లాస్ట్ (అగ్గి తెగులు)',
		'Leaf scald': 'లీఫ్ స్కాల్డ్ (ఆకు మాడు తెగులు)',
		'Sheath Blight': 'షీత్ బ్లైట్ (పదగళ్లు తెగులు/కాండం కుళ్లు తెగులు)',
		'Healthy Rice Leaf': 'ఆరోగ్యకరమైన వరి ఆకు',
		'Not a Paddy Leaf': 'ఇది వరి ఆకు కాదు'
	}

	const isHealthy = result?.disease === 'Healthy Rice Leaf' // Fixed to match backend class name
	const isNotLeaf = result?.disease === 'Not a Paddy Leaf'

	return (
		<section className="max-w-3xl mx-auto px-4 py-10">
			<div className="text-center mb-10">
				<h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-3">
					Paddy Disease Detection 🌾
				</h2>
				<p className="text-emerald-800 text-lg">
					Upload a paddy leaf photo to identify diseases and get prevention tips
				</p>
			</div>

			<div className="bg-white rounded-xl shadow-lg border border-emerald-100 overflow-hidden">
				<div className="p-8">
					{/* Upload Area */}
					<div className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 rounded-xl p-8 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
						{preview ? (
							<div className="relative w-full max-w-sm">
								<img
									src={preview}
									alt="Preview"
									className="rounded-lg shadow-md border border-emerald-200 w-full h-64 object-cover"
								/>
								<button
									onClick={() => { setFile(null); setPreview(''); setResult(null) }}
									className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
								</button>
							</div>
						) : (
							<label className="flex flex-col items-center cursor-pointer w-full h-full">
								<div className="p-4 bg-emerald-100 rounded-full mb-4 text-emerald-600">
									<Upload size={32} />
								</div>
								<span className="text-lg font-semibold text-emerald-900">Click to upload image</span>
								<span className="text-sm text-emerald-600 mt-1">or drag and drop (JPG, PNG)</span>
								<input type="file" className="hidden" accept="image/*" capture="environment" onChange={handleFile} />
							</label>
						)}
					</div>

					{/* Action Buttons */}
					<div className="mt-8 flex justify-center">
						<button
							onClick={handleDetect}
							disabled={!file || isLoading}
							className={`
                                flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold shadow-md transition-all
                                ${!file || isLoading
									? 'bg-gray-300 text-gray-500 cursor-not-allowed'
									: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg transform hover:-translate-y-0.5'
								}
                            `}
						>
							{isLoading ? (
								<Loader message="Growth and life, analyzing..." />
							) : (
								<>
									<Camera size={20} /> Detect Disease
								</>
							)}
						</button>
					</div>
				</div>

				{/* Results Section */}
				{result && (
					<div className="border-t border-emerald-100 bg-emerald-50/30 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
						<div className="flex flex-col md:flex-row gap-6 items-start">
							{/* Status Icon */}
							<div className={`
                                p-4 rounded-full flex-shrink-0
                                ${isNotLeaf ? 'bg-red-100 text-red-600' :
									isHealthy ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}
                            `}>
								{isNotLeaf ? <AlertTriangle size={40} /> :
									isHealthy ? <CheckCircle size={40} /> : <AlertTriangle size={40} />}
							</div>

							<div className="flex-1 w-full">
								<div className="flex flex-wrap justify-between items-start gap-4">
									<div>
										<h3 className="text-2xl font-bold text-emerald-900 leading-tight">
											{result.disease}
										</h3>
										<p className="text-lg font-bold text-teal-700 mt-1">
											{diseaseNamesTe[result.disease] || ''}
										</p>
										<div className="flex items-center gap-3 mt-3">

											{!isNotLeaf && (
												<>
													<span className={`
                                                        px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                        ${result.severity === 'Low' ? 'bg-blue-100 text-blue-700' :
															result.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
																result.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}
                                                    `}>
														Severity: {result.severity || 'N/A'}
													</span>
													<span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
														Confidence: {(result.confidence * 100).toFixed(0)}%
													</span>
												</>
											)}
										</div>
									</div>
									<button
										onClick={speakResult}
										className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 px-3 py-2 rounded-md transition-colors"
										title="Listen to results"
									>
										<Volume2 size={20} /> <span className="hidden sm:inline">Listen</span>
									</button>
								</div>

								<div className="mt-6 grid md:grid-cols-2 gap-6">
									<div className="bg-white p-5 rounded-lg border border-emerald-100 shadow-sm">
										<h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
											<span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
											Prevention Tips (English)
										</h4>
										<ul className="space-y-2">
											{result.tips.en.map((tip, i) => (
												<li key={i} className="flex gap-2 text-emerald-800 text-sm">
													<span className="text-emerald-500 mt-1">•</span>
													{tip}
												</li>
											))}
										</ul>
									</div>

									<div className="bg-white p-5 rounded-lg border border-emerald-100 shadow-sm">
										<h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
											<span className="w-2 h-6 bg-teal-500 rounded-full"></span>
											నివారణ చర్యలు (Telugu)
										</h4>
										<ul className="space-y-2">
											{result.tips.te.map((tip, i) => (
												<li key={i} className="flex gap-2 text-emerald-800 text-sm">
													<span className="text-teal-500 mt-1">•</span>
													{tip}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
