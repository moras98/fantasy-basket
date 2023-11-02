import { Button, Card, CardActionArea, CardContent, CardMedia, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Badge } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellPlayer, buyPlayer } from "../../store/users_teams/UsersTeams.actions";

export default function PlayerCard({player, modifiableStatus, teams, position, players}){
    const dispatch = useDispatch();
    const [showPlayerList, setShowPlayerList] = React.useState(false);
    const myTeam = useSelector(state => state.usersTeams.myTeam);
    const [sellButtonDisabled, setSellButtonDisabled] = React.useState(false);
    const [buyButtonDisabled, setBuyButtonDisabled] = React.useState(false);

    const filteredPlayers = (players, position) => {
        const filtered = {}
        for (const playerId in players) {
            if (players[playerId].position === position) {
              filtered[playerId] = players[playerId];
            }
        }
        // const sortedFiltered = {};
        const sortedFiltered = [];
        Object.keys(filtered)
            .sort((playerIdA, playerIdB) => {
            const valueA = filtered[playerIdA].value || 0;
            const valueB = filtered[playerIdB].value || 0;
            return valueB - valueA;
            })
            .forEach((playerId) => {
                sortedFiltered.push(filtered[playerId]);
            });
        return sortedFiltered;
    }

    const handleClickSell = (player) => {
        let columnName = ""
        let playerId = player?.id;
        let value = player?.value;
        if (position === 'BASE') {columnName = 'player1_id'}
        if (position === 'ESCOLTA') {columnName = 'player2_id'}
        if (position === 'ALERO') {columnName = 'player3_id'}
        if (position === 'ALA-PIVOT') {columnName = 'player4_id'}
        if (position === 'PIVOT') {columnName = 'player5_id'}

        const data = {columnName, playerId, value};

        dispatch(sellPlayer(data));
        setSellButtonDisabled(true);
        setBuyButtonDisabled(false);

    }

    const handleClickBuy = (player) => {
        let columnName = ""
        let playerId = player?.id;
        let value = player?.value;
        if (position === 'BASE') {columnName = 'player1_id'}
        if (position === 'ESCOLTA') {columnName = 'player2_id'}
        if (position === 'ALERO') {columnName = 'player3_id'}
        if (position === 'ALA-PIVOT') {columnName = 'player4_id'}
        if (position === 'PIVOT') {columnName = 'player5_id'}

        const data = {columnName, playerId, value};

        dispatch(buyPlayer(data));
        setSellButtonDisabled(false);
        setBuyButtonDisabled(true);
    }

    return (
        <Badge badgeContent={'+' +  player?.last_points_scored + ' FFP'} color="primary">
            <Card component={Paper} sx={{width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia sx={{height:130, display: player?'block':'none'}}><PersonIcon sx={{height: 130, width: 'auto'}}/></CardMedia>
            <CardContent sx={{display: player?'block':'none'}}>
                <Typography gutterBottom variant="h5" component="div">
                {player?.first_name} {player?.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {teams[player?.team_id]?.name}<br/>
                    {player?.position}<br/>
                    <br/>
                </Typography>
                <Typography sx={{color: 'green'}}>
                    <b>${player?.value?.toLocaleString()}</b>
                </Typography>
                <Button onClick={()=>handleClickSell(player)} sx={{display: modifiableStatus?'row':'none', color: '#ff9738', fontWeight: 'bold'}} disabled={sellButtonDisabled}>Vender</Button>
            </CardContent>
            {/* si no hay jugador */}
            <CardActionArea sx={{display: player?'none':'block'}} onClick={() => setShowPlayerList(true)}>
                <CardMedia><AddIcon sx={{height: 130, width: 'auto'}}/></CardMedia>
                <CardContent>
                    <Typography variant="body2" sx={{color: '#ff9738', fontWeight: 'bold'}}>COMPRAR {position}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <Popover
            open={showPlayerList}
            onClose={() => setShowPlayerList(false)}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >   
            {/* Contenido de la lista de jugadores */}
            <TableContainer component={Paper}>
                <Table aria-label="buy players">
                    {/* Renderiza aquí la lista de jugadores */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align='right'>Equipo</TableCell>
                            <TableCell align='right'>Posición</TableCell>
                            <TableCell align='right'>Valor</TableCell>
                            <TableCell align="right">Últimos FFP</TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {Object.keys(filteredPlayers(players, position)).map(key => {
                            const player = players[key];
                            return (
                                <TableRow key={key}  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f2f2f2' } }}>
                                    <TableCell>{player?.first_name} {player?.last_name}</TableCell>
                                    <TableCell align='right'>{teams[player?.team_id]?.name}</TableCell>
                                    <TableCell align='right'>{player?.position}</TableCell>
                                    <TableCell align='right'>{player?.value?.toLocaleString()}</TableCell>
                                    <TableCell align='right'><Button disabled={!modifiableStatus || myTeam?.money < player?.value || buyButtonDisabled} onClick={()=>{handleClickBuy(player); setShowPlayerList(false)}} sx={{color: '#ff9738', fontWeight: 'bold'}} >Comprar</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody> */}
                    {filteredPlayers(players, position).map(key => {
                            const player = players[key];
                            return (
                                <TableRow key={key}  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f2f2f2' } }}>
                                    <TableCell>{player?.first_name} {player?.last_name}</TableCell>
                                    <TableCell align='right'>{teams[player?.team_id]?.name}</TableCell>
                                    <TableCell align='right'>{player?.position}</TableCell>
                                    <TableCell align='right'>{player?.value?.toLocaleString()}</TableCell>
                                    <TableCell align="right">{player?.last_points_scored}</TableCell>
                                    <TableCell align='right'><Button disabled={!modifiableStatus || myTeam?.money < player?.value || buyButtonDisabled} onClick={()=>{handleClickBuy(player); setShowPlayerList(false)}} sx={{color: '#ff9738', fontWeight: 'bold'}} >Comprar</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Popover>
        </Badge>
    );
}