import API from './client';

export const fetchTeams = async () => {
    try {
      const response = await API.get(`teams`);
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}

// API interface for loading a team by team ID
export const fetchTeam = async (team_id) => {
    try {
      const response = await API.get(`teams/${team_id}`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}
