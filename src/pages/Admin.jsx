import { useState, useEffect } from 'react'
import { getAllFarmers } from '../services/farmerService.js'
import { saveProfileToExcel } from '../utils/excel.js'
import { useLoading } from '../context/LoadingContext.jsx'

export default function Admin() {
    const [profiles, setProfiles] = useState([])
    const { setIsLoading } = useLoading()
    const [error, setError] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [loginError, setLoginError] = useState('')

    function handleAdminLogin(e) {
        e.preventDefault()
        if (user === 'Rakshith' && pass === 'Rakshi@123') {
            setIsAdmin(true)
            setLoginError('')
        } else {
            setLoginError('Invalid Administrator Credentials')
        }
    }

    useEffect(() => {
        async function fetchAllProfiles() {
            setIsLoading(true)
            try {
                const data = await getAllFarmers()
                setProfiles(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAllProfiles()
    }, [setIsLoading])

    if (!isAdmin) {
        return (
            <section className="max-w-md mx-auto px-4 py-20">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-emerald-100">
                    <h2 className="text-2xl font-black text-emerald-900 mb-6 text-center italic">Admin Verification</h2>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        {loginError && <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold text-center">{loginError}</div>}
                        <div>
                            <label className="block text-sm font-bold text-emerald-800 mb-1">Username</label>
                            <input
                                type="text"
                                value={user}
                                onChange={e => setUser(e.target.value)}
                                className="w-full border border-emerald-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-100 focus:outline-none"
                                placeholder="Admin ID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-emerald-800 mb-1">Password</label>
                            <input
                                type="password"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                                className="w-full border border-emerald-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-100 focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="w-full py-4 bg-emerald-900 text-white font-black rounded-xl hover:bg-emerald-800 transition-all shadow-lg active:scale-95">
                            Authorize Access
                        </button>
                    </form>
                </div>
            </section>
        )
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-emerald-900">Central Records</h2>
                    <p className="text-emerald-700 text-sm italic">Live Data from MongoDB</p>
                </div>
                {profiles.length > 0 && (
                    <button
                        onClick={() => saveProfileToExcel(profiles)}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                    >
                        Export to Excel
                    </button>
                )}
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-6">{error}</div>}

            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-emerald-50/50">
                            <tr>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Farmer</th>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Phone</th>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Village</th>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Variety</th>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Soil/Season</th>
                                <th className="p-4 text-emerald-900 font-black text-xs uppercase border-b border-emerald-100">Sowing Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50">
                            {profiles.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-10 text-center text-gray-500 font-medium">
                                        No farmers found in MongoDB Atlas.
                                    </td>
                                </tr>
                            ) : (
                                profiles.map((p, i) => (
                                    <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                                        <td className="p-4 font-bold text-emerald-950">{p.name}</td>
                                        <td className="p-4 text-emerald-800">{p.phone}</td>
                                        <td className="p-4 text-emerald-800">{p.village}</td>
                                        <td className="p-4 text-emerald-800">{p.paddyVariety}</td>
                                        <td className="p-4 text-emerald-700 text-sm">
                                            <span className="bg-emerald-100 px-2 py-0.5 rounded text-xs font-bold mr-1">{p.soilType}</span>
                                            <span className="bg-blue-100 px-2 py-0.5 rounded text-xs font-bold">{p.season}</span>
                                        </td>
                                        <td className="p-4 text-emerald-900 font-mono text-sm">{new Date(p.sowingDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
