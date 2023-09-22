import React from "react";
import GameStatsTable from "../../components/GameStatsTable/GameStatsTable";
import { useParams } from "react-router-dom";

export default function GameStats(){
    const gameId = useParams();
    return(
        <section style={{padding: '0 5%'}} className="main-section">
            <h1>Información del partido</h1>
            <GameStatsTable gameId={gameId}/>
        </section>
    );
}