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
        <section className='main-section' style={{padding: "0 5%"}}>
            <div className='sub-section'>
                <div>
                    <h1>Jugadores</h1>
                </div>
                <div>
                    <PlayersList players={players}/>
                </div>
            </div>
        </section>
    );
};

export default Players;