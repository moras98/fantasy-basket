import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlayerStatsById, loadGameStatsById, loadPlayerStatsByIdAndGame } from '../../store/game_stats/GameStats.actions';
import { resetStats } from '../../store/game_stats/GameStats.reducers';
import { loadPlayers } from '../../store/player/Player.actions';
import { loadTeams } from '../../store/team/Team.actions';

export default function GameStatsTable({ playerId, gameId }){
    const dispatch = useDispatch();
    const game_stats = useSelector( state => state.game_stats);
    const players = useSelector(state => state.players);
    const teams = useSelector (state => state.teams);

    React.useEffect(()=>{
        async function load(){
            dispatch(resetStats());
            dispatch(loadTeams());
            if(playerId && gameId){
                await dispatch( loadPlayerStatsByIdAndGame(playerId, gameId));
            } else if (gameId) {
                await dispatch(loadGameStatsById(gameId));
                await dispatch(loadPlayers());
            } else if (playerId){
                await dispatch(loadPlayerStatsById(playerId))
            }
        }
        load();
    }, [dispatch, playerId, gameId]);


    function timeToSeconds(time) {
        const parts = time.split(":");
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const finalSeconds = remainingSeconds % 60;
      
        // Formatear en "HH:MM:SS"
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${finalSeconds.toString().padStart(2, "0")}`;
        return formattedTime;
    }

    const calculateAverages = () => {
        if (!game_stats) return {};
        
        const averages = {
            time_played: 0,
            points_scored: 0,
            off_rebounds: 0,
            def_rebounds: 0,
            assists: 0,
        };

        const statsCount = Object.keys(game_stats).length;

        if (statsCount === 0) return averages;

        Object.keys(game_stats).forEach(key => {
            const stats = game_stats[key];
            averages.time_played += timeToSeconds(stats.time_played);
            averages.points_scored += stats.points_scored;
            averages.off_rebounds += stats.off_rebounds;
            averages.def_rebounds += stats.def_rebounds;
            averages.assists += stats.assists;
        });

        // Calcular promedios dividiendo por el número de estadísticas
        Object.keys(averages).forEach(key => {
            averages[key] /= statsCount;
        });

        return averages;
    };

    const averages = calculateAverages();


    return(
        <TableContainer component={Paper}>
            <Table aria-label='stats table'>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{display: gameId?'none': 'flex'}}>Partido</TableCell>
                        <TableCell align='right' sx={{display: playerId?'none': 'flex'}}>Jugador</TableCell>
                        <TableCell align='right'>Tiempo Jugado</TableCell>
                        <TableCell align='right'>Puntos</TableCell>
                        <TableCell align='right'>Rebotes Ofensivos</TableCell>
                        <TableCell align='right'>Rebotes Defensivos</TableCell>
                        <TableCell align='right'>Asistencias</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {game_stats && Object.keys(game_stats).length > 0 && Object.keys(game_stats).map(key=>{
                        const stats = game_stats[key];
                        return(
                            <TableRow 
                            key={stats.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                            >
                                <TableCell component="th" scope='row' sx={{display: gameId?'none': 'flex'}}>{stats.game_id}</TableCell>
                                <TableCell align='right' sx={{display: playerId?'none': 'flex'}}>{players[stats.player_id]?.first_name} {players[stats.player_id]?.last_name} ({teams[players[stats.player_id]?.team_id]?.name})</TableCell>
                                <TableCell align='right'>{stats.time_played}</TableCell>
                                <TableCell align='right'>{stats.points_scored}</TableCell>
                                <TableCell align='right'>{stats.off_rebounds}</TableCell>
                                <TableCell align='right'>{stats.def_rebounds}</TableCell>
                                <TableCell align='right'>{stats.assists}</TableCell>
                            </TableRow>
                        )
                    })}
                    <TableRow sx={{display: gameId?'none': 'table-row'}}>
                            <TableCell component="th" scope='row' sx={{fontWeight: 'bold'}}>Promedios:</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{secondsToTime(averages.time_played)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.points_scored.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.off_rebounds.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.def_rebounds.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.assists.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}