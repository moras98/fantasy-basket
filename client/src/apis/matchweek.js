import API from './client';

export const fetchMatchWeeks = async () => {
    try {
        const response = await API.get('matchweeks');
        return response.data;
    } catch(err){
        throw err.response.data;
    }
}

export const fetchCurrentMatchWeek = async () => {
    try {
        const response = await API.get('matchweeks/current');
        return response.data;
    } catch(err){
        throw err.response.data;
    }
}