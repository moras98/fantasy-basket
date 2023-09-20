import React from "react";
import GamesList from "../../components/GamesList/GamesList";

export default function Games(){
    return(
        <section style={{padding: '0 5%'}}>
            <div>
                <h1>Partidos Jugados</h1>
            </div>
            <GamesList/>
        </section>
    );
} 