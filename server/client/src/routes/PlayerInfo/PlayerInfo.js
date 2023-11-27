import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadPlayerById, loadPlayers } from '../../store/player/Player.actions';
import { useParams } from 'react-router-dom';
// import PlayersList from '../../components/PlayersList/PlayersList';
import GameStatsTable from '../../components/GameStatsTable/GameStatsTable';
import { calcularEdad } from '../../apis/player';
import { loadTeams } from '../../store/team/Team.actions';


function PlayerInfo() {
    const { playerId } = useParams();
    const dispatch = useDispatch();
    const player = useSelector(state => state.players[playerId]);
    const teams = useSelector(state => state.teams);
    useEffect(() => {
            // dispatch(loadPlayerById(playerId));
            dispatch( loadTeams());
    }, [dispatch, playerId]);
    
    if (!player) {
        // Puedes mostrar un mensaje de carga o manejar el caso cuando el equipo aún no se ha cargado
        return <p>Cargando...</p>;
    }


    return (
        <section style={{padding: '0 5%'}} className='main-section'>
             {/* <PlayersList players={[player]}/> */}
             <div>
                <h2>{player?.first_name} {player?.last_name}</h2>
                <h3>{teams[player?.team_id].name} - {player?.position} - {player?.height}(cm) - {calcularEdad(player?.age)} - ${player?.value?.toLocaleString()}</h3>
             </div>
             <GameStatsTable playerId={playerId}/>
        </section>
    );
}

export default PlayerInfo;