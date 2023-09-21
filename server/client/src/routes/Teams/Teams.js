import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadTeams } from '../../store/team/Team.actions';
import TeamCard from '../../components/TeamCard/TeamCard';
import './Teams.css'


function Teams() {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams);

    useEffect(()=>{
        async function load() {
            await dispatch( loadTeams());
        }
        load();
    }, [dispatch]);

    return (
        <section >
            <h1>EQUIPOS DE LA LIGA</h1>
            <div id='teamsGrid'>
            {teams && Object.keys(teams).length > 0 && Object.keys(teams).map(key => {
                    const team = teams[key];
                    return <TeamCard key={key} id={team.id} name={team.name} src={team.badge}/>
                })}
            </div>
        </section>
    );
}

export default Teams;