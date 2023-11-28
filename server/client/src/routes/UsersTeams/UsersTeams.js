import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserTeams } from "../../store/users_teams/UsersTeams.actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { loadUsernames } from "../../store/users/Users.actions";
import PersonIcon from '@mui/icons-material/Person';

export default function UsersTeams(){
    const dispatch = useDispatch();
    const usersteams = useSelector(state=>state.usersTeams.allTeams);
    const users = useSelector(state=>state.users);

    useEffect(()=>{
        async function load() {
            await dispatch(loadUserTeams());
            await dispatch(loadUsernames());
        }
        load();
    }, [dispatch]);


    // if (!usersteams) {
    //     return <p>Cargando...</p>
    // }

    const sortedTeams = useMemo(() => {
        if (!usersteams) return [];
        const teamsArray = Object.keys(usersteams).map(key => usersteams[key]);
        return teamsArray.sort((a, b) => b.points - a.points);
    }, [usersteams]);

    if (!sortedTeams) {
        return <p>Cargando...</p>
    }

    return (
        //Lista que contiene a todos los equipos ordenados por puntos
        <section style={{padding:'0 5%'}} className="main-section">
            <h1>Tabla de Posiciones</h1>
            <TableContainer component={Paper}>
                <Table aria-label='leaderboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Posición</TableCell>
                            <TableCell align="right">Usuario</TableCell>
                            <TableCell align="right">Puntos</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {
                            usersteams && Object.keys(usersteams).length > 0 && Object.keys(usersteams).map((key, index) => {
                            const team = usersteams[key];
                            const posicion = index + 1;
                            return(
                                <TableRow key={key}>
                                    <TableCell>{posicion}</TableCell>
                                    <TableCell align="right">{users[team?.user_id]?.username}</TableCell>
                                    <TableCell align="right">{team?.points.toLocaleString()}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody> */}
                    <TableBody>
                        {sortedTeams.map((team, index) => (
                            <TableRow key={team.user_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="right">{users[team?.user_id]?.username}</TableCell>
                                <TableCell align="right">{team?.points.toLocaleString()} ( +{team?.last_points.toLocaleString()}     |   <b>x{team?.players_played}</b><PersonIcon sx={{verticalAlign: 'middle'}}/> )</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}