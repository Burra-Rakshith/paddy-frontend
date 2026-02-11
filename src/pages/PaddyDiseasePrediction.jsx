export default function PaddyDiseasePrediction() {
	return (
		<section className="max-w-4xl mx-auto px-4 py-10">
			<h2 className="text-3xl font-extrabold text-emerald-900">
				Paddy Disease Prediction
			</h2>

			<p className="mt-4 text-emerald-800">
				Paddy disease prediction uses modern Machine Learning and Deep Learning
				techniques to automatically identify diseases from rice leaf images. Below
				is a simple overview of the technology used behind the scenes.
			</p>

			<div className="mt-6 space-y-6">
				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">1. Machine Learning (ML)</h3>
					<p className="mt-2 text-emerald-800 text-sm">
						Machine Learning is the core technology behind paddy disease prediction.
						It learns from images of healthy and diseased paddy leaves to identify
						what kind of disease a new image might have.
					</p>
					<ul className="mt-3 list-disc list-inside text-emerald-800 text-sm">
						<li>Collect a dataset of paddy leaf images (healthy and diseased).</li>
						<li>Train a supervised model on these labeled images.</li>
						<li>The model learns patterns, colors, and textures for each disease.</li>
						<li>For a new image, the model predicts the disease category.</li>
					</ul>
				</section>

				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">
						2. Deep Learning – CNN (Convolutional Neural Networks)
					</h3>
					<p className="mt-2 text-emerald-800 text-sm">
						Most modern systems use Deep Learning, especially CNNs, which are ideal
						for image recognition tasks like leaf disease detection.
					</p>
					<ul className="mt-3 list-disc list-inside text-emerald-800 text-sm">
						<li>Automatically extracts features such as edges and textures.</li>
						<li>No need for manual feature engineering.</li>
						<li>Provides high accuracy when trained on enough data.</li>
					</ul>
					<p className="mt-3 text-emerald-800 text-sm">
						Common frameworks: <strong>TensorFlow / Keras</strong> and{' '}
						<strong>PyTorch</strong>.
					</p>
				</section>

				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">
						3. Image Processing (OpenCV)
					</h3>
					<p className="mt-2 text-emerald-800 text-sm">
						Before training, images are cleaned and preprocessed so the model can
						focus on the leaf.
					</p>
					<ul className="mt-3 list-disc list-inside text-emerald-800 text-sm">
						<li>Resizing – makes all images the same size.</li>
						<li>Noise reduction – removes background noise.</li>
						<li>Segmentation – isolates the leaf from the background.</li>
						<li>Color normalization – adjusts lighting and contrast.</li>
					</ul>
					<p className="mt-3 text-emerald-800 text-sm">
						Tools: <strong>OpenCV</strong>, <strong>Pillow (PIL)</strong>,{' '}
						<strong>NumPy</strong>.
					</p>
				</section>

				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">4. Dataset</h3>
					<p className="mt-2 text-emerald-800 text-sm">
						The model is trained on thousands of labeled paddy leaf images.
					</p>
					<ul className="mt-3 list-disc list-inside text-emerald-800 text-sm">
						<li>Kaggle – Paddy Disease Classification Dataset.</li>
						<li>PlantVillage and similar open datasets.</li>
					</ul>
					<p className="mt-3 text-emerald-800 text-sm">
						Common classes: Healthy, Brown Spot, Rice Blast, Bacterial Leaf Blight,
						Sheath Blight, Tungro Virus.
					</p>
				</section>

				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">5. Model Deployment</h3>
					<ul className="mt-3 list-disc list-inside text-emerald-800 text-sm">
						<li>
							<strong>Web (TensorFlow.js)</strong>: Run the trained model directly in
							the browser so predictions happen instantly after upload.
						</li>
						<li>
							<strong>Backend API</strong>: Host the model with Flask or FastAPI.
							The React app sends the image, and the API returns a prediction.
						</li>
					</ul>
				</section>

				<section className="bg-white p-5 rounded-lg border border-emerald-100">
					<h3 className="font-bold text-emerald-900">6. Workflow Summary</h3>
					<ol className="mt-3 list-decimal list-inside text-emerald-800 text-sm space-y-1">
						<li>Farmer uploads a paddy leaf image.</li>
						<li>Image is preprocessed (resize, clean, segment leaf).</li>
						<li>CNN model predicts the most likely disease.</li>
						<li>
							The app displays the disease name, confidence, and treatment
							suggestions.
						</li>
					</ol>
					<p className="mt-4 text-emerald-900 text-sm">
						<strong>Example output:</strong> Detected Disease: <em>Brown Spot</em>,
						Confidence: 94%, Recommendation: apply recommended fungicide and maintain
						proper nitrogen levels.
					</p>
				</section>
			</div>
		</section>
	)
}


