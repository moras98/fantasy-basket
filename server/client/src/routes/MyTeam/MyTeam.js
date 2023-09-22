import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers } from "../../store/player/Player.actions";
import { Container, Paper, Stack, Modal } from "@mui/material";
import { checkModifiable, loadMyTeam } from "../../store/users_teams/UsersTeams.actions";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { loadTeams } from '../../store/team/Team.actions';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function MyTeam() {
    const dispatch = useDispatch();
    const myTeam = useSelector(state => state.usersTeams.myTeam);
    const modifiableStatus = useSelector(state => state.usersTeams.modifiable);
    const teams = useSelector(state => state.teams);
    const players = useSelector(state=>state.players);

    const [openHelp, setOpenHelp] = React.useState(false);
    const handleOpenHelp = () => setOpenHelp(true);
    const handleCloseHelp = () => setOpenHelp(false);

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
        <section className="main-section">
            <div className="sub-section" style={{padding: '0 5%', gap: 10, marginTop: "100px"}}>
                <Stack sx={{color: "black", width: "100%", padding: "5px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}} component={Paper} elevation={5}>
                    <p>Puntos: <b style={{color:"#ff9738"}}>{myTeam?.points.toLocaleString()}pts</b></p>
                    <p>Dinero: <b style={{color:"#ff9738"}}>${myTeam?.money.toLocaleString()}</b></p>
                    <p>Mercado: <b style={{color:"#ff9738", display: modifiableStatus? 'inline-block':'none'}}>Si</b><b style={{color:"#ff9738", display: !modifiableStatus? 'inline-block':'none'}}>No</b></p>
                    <HelpOutlineIcon onClick={()=> handleOpenHelp()}/>
                </Stack>
                <Modal
                    open={openHelp}
                    onClose={handleCloseHelp}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Container component={Paper}
                        sx={{ position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,}}
                        >
                            <h3>¿Cómo funciona MyTeam?</h3>
                            <p><b>Mercado:</b> El período de transferencias para modificar el equipo se encuentra disponible a partir de la otorgación de los puntos finalizada la fecha anterior y hasta el día previo de arranque de la nueva fecha, hasta las 23.59 hrs.</p>
                            <p><b>Jugadores:</b> Los jugadores solo tienen disponibles una única posición en la que pueden jugar, a pesar de que en la vida real el jugador pueda desempeñar diferentes roles.</p>
                            <p><b>Puntuación:</b> Los puntos por fecha que otorga cada jugador se calcula en función de puntos marcados, asistencias, rebotes defensivos y rebotes ofensivos. Según la posición del jugador una o más estadísticas obtienen un multiplicador de x2.
                                BASE: ASISTENCIAS, ESCOLTA: PUNTOS, ALERO: REBOTES OF, ALA-PIVOT: REBOTES DEF, PIVOT: REBOTES OF Y REBOTES DEF </p>
                    </Container>
                </Modal>
                <Container
                    component={Paper}
                    sx={{
                        backgroundImage: `url("/assets/myTeam/court.jpg")`,
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
            </div>
        </section>
    );
}