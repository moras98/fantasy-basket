import API from './client';

export const fetchPlayers = async () => {
    try {
      const response = await API.get(`players`);
  
      return response.data;
  
    } catch (err) {
      throw err.response.data;
    }
}

// API interface for loading a team by team ID
export const fetchPlayerById = async (playerId) => {
    try {
      const response = await API.get(`players/${playerId}`);
  
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
}

// API interface for loading a team by team ID
export const fetchTeamPlayers = async (team_id) => {
  try {
    const response = await API.get(`teams/${team_id}/players`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

export const fetchPlayerFromTeam = async (team_id, player_id) => {
try {
  const response = await API.get(`teams/${team_id}/players/${player_id}`);

  return response.data;

} catch(err) {
  throw err.response.data;
}
}

export function calcularEdad(fechaNacimiento) {
  // Convierte la cadena de fecha de nacimiento en un objeto Date
  const fechaNac = new Date(fechaNacimiento);

  // Obtiene la fecha actual
  const fechaActual = new Date();

  // Calcula la diferencia en milisegundos entre las dos fechas
  const diferencia = fechaActual - fechaNac;

  // Calcula la edad en años
  const edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));

  return edad;
}

export function calcularPromedios(games_stats){
  console.log(games_stats.length());
}