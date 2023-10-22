import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadTeamById, loadTeams } from '../../store/team/Team.actions';
import { useNavigate, useParams } from 'react-router-dom';
import { loadGamesByTeamId } from '../../store/game/Game.actions';
import './TeamInfo.css'
import { resetGames } from '../../store/game/Game.reducers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { resetPlayers } from '../../store/player/Player.reducers';
import { loadPlayersByTeam } from '../../store/player/Player.actions';
import { calcularEdad } from '../../apis/player';

function TeamInfo() {
    const { teamId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const team = useSelector(state => state.teams[teamId]);
    const games = useSelector(state => state.games);
    const teams = useSelector(state => state.teams);
    const players = useSelector(state => state.players)

    useEffect(() => {
        async function load(){
            if (teamId) {
                // Cargar el equipo por ID si el teamId existe
                dispatch(resetPlayers());
                dispatch(resetGames());
                dispatch(loadTeams());
                dispatch(loadTeamById(teamId));
                dispatch(loadGamesByTeamId(teamId));
                dispatch(loadPlayersByTeam(teamId));
            }
        }
        load();
    }, [dispatch,teamId]);

    if (!team) {
        // Puedes mostrar un mensaje de carga o manejar el caso cuando el equipo aún no se ha cargado
        return <p>Cargando...</p>;
    }

    return (
        <section className='main-section'>
            <div className='sub-section'>
            <h1>{team?.name}</h1>
            <div id='tablesGrid'>
                <div>
                    {/* Lista partidos jugados */}
                    <h2>Partidos Jugados</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 300}} aria-label='games table'>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>Partido</TableCell> */}
                                    <TableCell align='right'>Fecha</TableCell>
                                    <TableCell align='right'>Resultado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {games && Object.keys(games).length > 0 && Object.keys(games).map(key=>{
                                    const game = games[key];
                                    return(
                                        <TableRow 
                                        key={game.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                                        onClick={()=>{navigate(`/games/${game.id}`)}}
                                        >
                                            {/* <TableCell>{game.id}</TableCell> */}
                                            <TableCell align='right'>{game.date.split('T')[0]}</TableCell>
                                            <TableCell align='right'>{teams[game.team1_id]?.name} {game.team1_score} - {game.team2_score} {teams[game.team2_id]?.name}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    {/* Lista jugadores */}
                    <h2>Plantilla</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 300}} aria-label='players list'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Posición</TableCell>
                                    <TableCell>Altura (cm)</TableCell>
                                    <TableCell>Edad</TableCell>
                                    <TableCell>Valor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players && Object.keys(players).length > 0 && Object.keys(players).map(key => {
                                    const player = players[key];
                                    return(
                                        <TableRow
                                        key={player.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                                        onClick={()=>{navigate(`/players/${player.id}`)}}>
                                            <TableCell>{player.first_name} {player.last_name}</TableCell>
                                            <TableCell>{player.position}</TableCell>
                                            <TableCell>{player.height}</TableCell>
                                            <TableCell>{calcularEdad(player.age)}</TableCell>
                                            <TableCell>{player.value}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            </div>
        </section>
    );
}

export default TeamInfo;