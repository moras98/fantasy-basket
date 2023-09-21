import API from './client';
import { fetchCurrentMatchWeek } from './matchweek';

export const fetchUserTeam =async (user_id) => {
    try {
        const response = await API.get('myTeam/mine');
        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}

export const fetchAllUsersTeams = async () => {
    try {
      const response = await API.get(`myTeam/all`);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}

export const fetchUserTeamById =async (id) => {
    try {
        const response = await API.get(`myTeam/${id}`);
        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}

export const updatePlayerUserTeam =async (columnName, player_id) => {
    try {
        const response = await API.post(`myTeam/players/${columnName}/${player_id}`);
        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}

export const isModifiable = async () => {
    try {
        const deadline = await fetchCurrentMatchWeek();
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        const deadlineDate = new Date(deadline?.start_date);

        if (currentDate < deadlineDate){
            return true
        } else {
            return false
        }
    } catch(err){
        throw err.response.data;
    }
}

export const createMyTeam = async (userId) => {
    try {
        const data = {
            user_id: userId,
        }
        const response = await API.post('/myTeam/create', data)
        return response.data
    } catch(err){
        throw err.response.data
    }
}

export const sellPlayerUserTeam = async (columnName, playerId, value) => {
    try {
        const response = await API.post('myTeam/sellPlayer', {columnName, playerId, value});
        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}

export const buyPlayerUserTeam = async (columnName, playerId, value) => {
    try {
        const response = await API.post('myTeam/buyPlayer', {columnName, playerId, value});
        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}