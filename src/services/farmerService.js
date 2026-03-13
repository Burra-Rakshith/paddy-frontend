const API_URL = 'https://paddy-backend-silk.vercel.app/api/farmers/';

export const getAllFarmers = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch farmers');
    }
    return data;
};

export const registerFarmer = async (formData) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to register farmer');
    }
    return data;
};

export const getFarmerProfile = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
    }
    return data;
};

export const updateFarmerProfile = async (id, formData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
    }
    return data;
};
