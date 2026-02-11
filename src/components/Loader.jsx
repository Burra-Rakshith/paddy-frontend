import { Sprout } from 'lucide-react'

const Loader = ({ message = "Growing insights..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 animate-in fade-in duration-700">
            <div className="relative">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-2xl opacity-20 animate-paddy-glow"></div>

                {/* Pulsing Paddy Icon */}
                <div className="relative bg-white p-6 rounded-full shadow-lg border border-emerald-100 animate-paddy-pulse">
                    <Sprout size={64} className="text-emerald-600 animate-paddy-glow" />
                </div>
            </div>

            {message && (
                <p className="mt-6 text-emerald-800 font-medium text-lg tracking-wide animate-pulse">
                    {message}
                </p>
            )}
        </div>
    )
}

export default Loader
