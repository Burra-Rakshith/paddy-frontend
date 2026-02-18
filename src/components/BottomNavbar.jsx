import React from 'react';
import { NavLink } from 'react-router-dom';
import { Info, LayoutGrid, Camera, User, Bell, Home } from 'lucide-react';
import { useFarmer } from '../context/FarmerContext';

const BottomNavbar = () => {
    const { farmerId } = useFarmer();
    const isAuthed = !!farmerId;
    const navItemClass = ({ isActive }) =>
        `flex flex-col items-center gap-1 group cursor-pointer transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100]">
            {/* Soft Shadow/Glow Background */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]"></div>

            <div className="relative px-6 py-4 pb-8 flex justify-between items-center max-w-md mx-auto">

                {/* Left Side Items */}
                <div className="flex gap-10">
                    <NavLink to="/about" className={navItemClass}>
                        <Info className="w-6 h-6" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">About</span>
                    </NavLink>
                    <NavLink to="/services" className={navItemClass}>
                        <LayoutGrid className="w-6 h-6" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Services</span>
                    </NavLink>
                </div>

                {/* Center Scanner (only if authed) */}
                <div className="absolute left-1/2 -top-8 -translate-x-1/2 group">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <NavLink to={isAuthed ? "/detect" : "/login"} className="relative block">
                        <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(46,125,50,0.4)] transition-transform duration-300 hover:scale-110 active:scale-95 border-4 border-white">
                            <Camera className="text-white w-7 h-7" />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase">Scan Paddy</span>
                    </NavLink>
                </div>

                {/* Right Side Items */}
                <div className="flex gap-10">
                    <NavLink to={isAuthed ? "/notifications" : "/register"} className={navItemClass}>
                        <div className="relative">
                            <Bell className="w-6 h-6" />
                            {isAuthed && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                                    <span className="text-[6px] text-white font-bold tracking-tighter">!</span>
                                </div>
                            )}
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-widest">{isAuthed ? 'Alerts' : 'Alerts'}</span>
                    </NavLink>
                    <NavLink to={isAuthed ? "/profile" : "/login"} className={navItemClass}>
                        <User className="w-6 h-6" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">{isAuthed ? 'Profile' : 'Login'}</span>
                    </NavLink>

                </div>

            </div>

            {/* iOS/Android Home Indicator Spacer */}
            <div className="h-2 bg-white flex justify-center pb-2">
                <div className="w-32 h-1 bg-slate-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default BottomNavbar;
