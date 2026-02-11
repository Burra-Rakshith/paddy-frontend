import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
	Home,
	Info,
	Sprout,
	Phone,
	Bell,
	User,
	Menu,
	X,
	Shield
} from 'lucide-react'
import { useFarmer } from '../context/FarmerContext'

const navLinkBase =
	'flex items-center gap-2 px-3 py-2 rounded-md hover:bg-emerald-100 text-emerald-900'
const activeClass = 'bg-emerald-200'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const { farmerId, logoutFarmer } = useFarmer()
	const isAuthed = !!farmerId

	function handleLogout() {
		logoutFarmer()
		navigate('/login')
	}

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-emerald-100">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex items-center justify-between py-3">
					<Link to="/" className="flex items-center gap-2">
						<Sprout className="text-farm-green" />
						<span className="font-extrabold text-lg text-emerald-900">
							Paddy Assistance
						</span>
					</Link>
					<nav className="hidden md:flex items-center gap-1">
						<NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
							<Home size={18} /> Home
						</NavLink>
						<NavLink to="/about" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
							<Info size={18} /> About
						</NavLink>
						<NavLink to="/services" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
							<Shield size={18} /> Services
						</NavLink>
						<NavLink to="/contact" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
							<Phone size={18} /> Contact
						</NavLink>
						{isAuthed && (
							<>
								<NavLink to="/notifications" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
									<Bell size={18} /> Notifications
								</NavLink>
								<NavLink to="/profile" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
									<User size={18} /> Profile
								</NavLink>
							</>
						)}
						{isAuthed ? (
							<button onClick={handleLogout} className="ml-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
								Logout
							</button>
						) : (
							<>
								<NavLink to="/register" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
									Register
								</NavLink>
								<NavLink to="/login" className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
									Login
								</NavLink>
							</>
						)}
					</nav>
					<button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
						{open ? <X /> : <Menu />}
					</button>
				</div>
				{open && (
					<div className="md:hidden pb-3 border-t border-emerald-100">
						<div className="grid gap-1 pt-3">
							<NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
								<Home size={18} /> Home
							</NavLink>
							<NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
								<Info size={18} /> About
							</NavLink>
							<NavLink to="/services" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
								<Shield size={18} /> Services
							</NavLink>
							<NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
								<Phone size={18} /> Contact
							</NavLink>
							{isAuthed && (
								<>
									<NavLink to="/notifications" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
										<Bell size={18} /> Notifications
									</NavLink>
									<NavLink to="/profile" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : ''}`}>
										<User size={18} /> Profile
									</NavLink>
								</>
							)}
							{isAuthed ? (
								<button onClick={() => { setOpen(false); handleLogout() }} className="mt-1 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
									Logout
								</button>
							) : (
								<div className="grid grid-cols-2 gap-2">
									<NavLink to="/register" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md bg-emerald-50 text-emerald-900 text-center">
										Register
									</NavLink>
									<NavLink to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md bg-emerald-600 text-white text-center">
										Login
									</NavLink>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	)
}


