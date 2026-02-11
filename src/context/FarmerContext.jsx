import { createContext, useContext, useState } from 'react';

const FarmerContext = createContext();

export const FarmerProvider = ({ children }) => {
    const [farmerId, setFarmerId] = useState(null);
    const [profile, setProfile] = useState(null);

    const loginFarmer = (data) => {
        setFarmerId(data._id);
        setProfile(data);
    };

    const logoutFarmer = () => {
        setFarmerId(null);
        setProfile(null);
    };

    return (
        <FarmerContext.Provider value={{ farmerId, profile, setProfile, loginFarmer, logoutFarmer }}>
            {children}
        </FarmerContext.Provider>
    );
};

export const useFarmer = () => {
    const context = useContext(FarmerContext);
    if (!context) {
        throw new Error('useFarmer must be used within a FarmerProvider');
    }
    return context;
};
