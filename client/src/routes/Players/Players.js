import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadPlayers } from '../../store/player/Player.actions';
import PlayersList from '../../components/PlayersList/PlayersList';

function Players(){
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);

    useEffect(()=>{
        async function load() {
            await dispatch(loadPlayers());
        }
        load();
    }, [dispatch]);

    if(!players) {
        return <p>Cargando...</p>
    }
    return(
        <section style={{padding: "0 5%"}}>
            <h1>Jugadores</h1>
            <PlayersList players={players}/>
        </section>
    );
};

export default Players;