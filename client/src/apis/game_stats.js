import API from './client';

export const fetchGameStatsById = async (game_id) => {
    try {
      const response = await API.get(`games/${game_id}/stats`);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}

export const fetchPlayerStatsById = async (player_id) => {
    try {
      const response = await API.get(`players/${player_id}/stats`);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}

export const fetchStatsByGameAndPlayer = async (player_id, game_id) => {
    try {
        const response = await API.get(`players/${player_id}/games/${game_id}/stats`);
        return response.data;
    } catch(err){
        throw err.response.data
    }
};