import React, { useEffect } from "react";
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


    if (!usersteams) {
        return <p>Cargando...</p>
    }

    return (
        //Lista que contiene a todos los equipos ordenados por puntos
        <section style={{padding:'0 5%'}}>
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
                    <TableBody>
                        {
                            usersteams && Object.keys(usersteams).length > 0 && Object.keys(usersteams).map((key, index) => {
                            const team = usersteams[key];
                            const posicion = index + 1;
                            return(
                                <TableRow key={key}>
                                    <TableCell>{posicion}</TableCell>
                                    <TableCell align="right">{users[team?.user_id]?.username}</TableCell>
                                    <TableCell align="right">{team?.points}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}