import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers } from "../../store/player/Player.actions";
import { Container, Paper } from "@mui/material";
import { checkModifiable, loadMyTeam } from "../../store/users_teams/UsersTeams.actions";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { loadTeams } from '../../store/team/Team.actions';

export default function MyTeam() {
    const dispatch = useDispatch();
    const myTeam = useSelector(state => state.usersTeams.myTeam);
    const modifiableStatus = useSelector(state => state.usersTeams.modifiable);
    const teams = useSelector(state => state.teams);
    const players = useSelector(state=>state.players);

    useEffect(()=>{
        async function load(){
            await dispatch(loadPlayers());
            await dispatch(checkModifiable());
            await dispatch(loadMyTeam());
            await dispatch(loadTeams());
        }
        load();
    }, [dispatch]);

    return(
        <section style={{padding: '0 5%'}} className="main-section">
            <h1>MyTeam</h1>
            <h2>{myTeam?.points}pts - ${myTeam?.money}</h2>
            <Container
                component={Paper}
                sx={{
                    backgroundImage: `url("/assets/myTeam/court.jpg")`, // Reemplaza con la URL de tu imagen de fondo
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: '20px'
                    
                }}
                elevation={8}
                >
                <div
                    style={{
                    display: "flex",
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: "20px",
                    width: "80%",
                    }}
                >
                    <PlayerCard player={players[myTeam?.player1_id]} modifiableStatus={modifiableStatus} teams={teams} position={'BASE'} players={players}/>
                    <PlayerCard player={players[myTeam?.player2_id]} modifiableStatus={modifiableStatus} teams={teams} position={'ESCOLTA'} players={players}/>
                    <PlayerCard player={players[myTeam?.player3_id]} modifiableStatus={modifiableStatus} teams={teams} position={'ALERO'} players={players}/>
                    <PlayerCard player={players[myTeam?.player4_id]} modifiableStatus={modifiableStatus} teams={teams} position={'ALA-PIVOT'} players={players}/>
                    <PlayerCard player={players[myTeam?.player5_id]} modifiableStatus={modifiableStatus} teams={teams} position={'PIVOT'} players={players}/>
                </div>
            </Container>
        </section>
    );
}