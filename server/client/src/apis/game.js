import API from './client';

export const fetchGames = async () => {
    try {
      const response = await API.get(`games`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}


export const fetchGameByDate = async (date) => {
    try {
      const response = await API.get(`games/${date}`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}

export const fetchGamesByTeam = async (team_id) => {
    try {
      const response = await API.get(`games/team/${team_id}`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}

export const fetchGameByTeamAndDate = async (team_id, date) => {
    try {
      const response = await API.get(`games/${team_id}/${date}`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}