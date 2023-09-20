import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames } from '../../store/game/Game.actions';
import { loadTeams } from '../../store/team/Team.actions';
import { useNavigate } from 'react-router-dom';


export default function GamesList(){
    const dispatch = useDispatch();
    const games = useSelector(state => state.games);
    const teams = useSelector(state => state.teams);
    const navigate = useNavigate();

    React.useEffect(()=>{
        async function load(){
            await dispatch(loadGames());
            await dispatch(loadTeams());
        }
        load();
    }, [dispatch]);

    return(
        <TableContainer component={Paper}>
            <Table aria-label='games table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Jornada</TableCell>
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
                                <TableCell>{game.matchweek_id}</TableCell>
                                <TableCell align='right'>{game.date.split('T')[0]}</TableCell>
                                <TableCell align='right'>{teams[game.team1_id]?.name} {game.team1_score} - {game.team2_score} {teams[game.team2_id]?.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}