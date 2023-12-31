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
import { loadGames } from '../../store/game/Game.actions';

export default function GameStatsTable({ playerId, gameId }){
    const dispatch = useDispatch();
    const game_stats = useSelector( state => state.game_stats);
    const players = useSelector(state => state.players);
    const teams = useSelector (state => state.teams);
    const games = useSelector(state=>state.games);

    React.useEffect(()=>{
        async function load(){
            dispatch(resetStats());
            dispatch(loadTeams());
            dispatch(loadGames());
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
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return  minutes * 60 + seconds;
    }

    function secondsToTime(seconds) {
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const finalSeconds = remainingSeconds % 60;
      
        // Formatear en "HH:MM:SS"
        const formattedTime = `${minutes.toString().padStart(2, "0")}:${finalSeconds.toString().padStart(2, "0")}`;
        return formattedTime;
    }

    function calculatePoints(stats){
        const player = players[stats?.player_id];
        const position = player?.position;

        let totalPoints = 0;
        if (position === 'BASE'){
            totalPoints = (stats.points_scored + stats.assists * 2 + stats.def_rebounds + stats.off_rebounds + stats.threes_scored + stats.steals + stats.blocks - stats.losts);
        }
        if (position === 'ESCOLTA'){
            totalPoints = (stats.points_scored * 2 + stats.assists + stats.def_rebounds + stats.off_rebounds + stats.threes_scored + stats.steals + stats.blocks - stats.losts);
        }
        if (position === 'ALERO'){
            totalPoints = (stats.points_scored + stats.assists + stats.def_rebounds + stats.off_rebounds + 3 * stats.threes_scored + stats.steals + stats.blocks - stats.losts);
        }
        if (position === 'ALA-PIVOT'){
            totalPoints = (stats.points_scored  + stats.assists + stats.def_rebounds * 2 + stats.off_rebounds + stats.threes_scored + stats.steals + stats.blocks - stats.losts);
        }
        if (position === 'PIVOT'){
            totalPoints = (stats.points_scored  + stats.assists + stats.def_rebounds * 2 + stats.off_rebounds * 2 + stats.threes_scored + stats.steals + stats.blocks - stats.losts);
        }
        return totalPoints;
    }

    const calculateAverages = () => {
        if (!game_stats) return {};
        
        const averages = {
            time_played: 0,
            points_scored: 0,
            threes_scored: 0,
            off_rebounds: 0,
            def_rebounds: 0,
            assists: 0,
            losts: 0,
            steals: 0,
            blocks: 0,
            ffp: 0,
        };

        const statsCount = Object.keys(game_stats).length;

        if (statsCount === 0) return averages;

        Object.keys(game_stats).forEach(key => {
            const stats = game_stats[key];
            averages.time_played += timeToSeconds(stats.time_played);
            averages.points_scored += stats.points_scored;
            averages.threes_scored += stats.threes_scored;
            averages.off_rebounds += stats.off_rebounds;
            averages.def_rebounds += stats.def_rebounds;
            averages.assists += stats.assists;
            averages.losts += stats.losts;
            averages.steals += stats.steals;
            averages.blocks += stats.blocks;
            averages.ffp += calculatePoints(stats);
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
                        <TableCell sx={{display: gameId?'none': 'flex', fontWeight:'bold'}}>FECHA</TableCell>
                        <TableCell align='right' sx={{display: playerId?'none': 'flex', fontWeight:'bold'}}>JUGADOR</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>MINS</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>PTS</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>3PTS</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>REO</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>RED</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>ASI</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>PER</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>ROB</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>BLQ</TableCell>
                        <TableCell align='right' sx={{fontWeight: 'bold'}}>FFP</TableCell>
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
                                <TableCell component="th" scope='row' sx={{display: gameId?'none': 'flex'}}>{games[stats.game_id].matchweek_id}</TableCell>
                                <TableCell align='right' sx={{display: playerId?'none': 'flex'}}>{players[stats.player_id]?.first_name} {players[stats.player_id]?.last_name} ({teams[players[stats.player_id]?.team_id]?.name})</TableCell>
                                <TableCell align='right'>{stats.time_played}</TableCell>
                                <TableCell align='right'>{stats.points_scored}</TableCell>
                                <TableCell align='right'>{stats.threes_scored}</TableCell>
                                <TableCell align='right'>{stats.off_rebounds}</TableCell>
                                <TableCell align='right'>{stats.def_rebounds}</TableCell>
                                <TableCell align='right'>{stats.assists}</TableCell>
                                <TableCell align='right'>{stats.losts}</TableCell>
                                <TableCell align='right'>{stats.steals}</TableCell>
                                <TableCell align='right'>{stats.blocks}</TableCell>
                                <TableCell align='right'>{calculatePoints(stats)}</TableCell>
                            </TableRow>
                        )
                    })}
                    <TableRow sx={{display: gameId?'none': 'table-row'}}>
                            <TableCell component="th" scope='row' sx={{fontWeight: 'bold'}}>Promedios:</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{secondsToTime(averages.time_played.toFixed(0))}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.points_scored.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.threes_scored.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.off_rebounds.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.def_rebounds.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.assists.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.losts.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.steals.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight: 'bold'}}>{averages.blocks.toFixed(2)}</TableCell>
                            <TableCell align='right' sx={{fontWeight:'bold'}}>{averages.ffp.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}