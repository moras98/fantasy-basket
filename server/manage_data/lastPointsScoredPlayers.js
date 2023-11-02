const { Client } = require("pg");
require('dotenv').config();

//BUSCO ESTADISTICAS PARA PARTIDO
//BUSCO AL JUGADOR PARA ESA ESTADISTICA
//CALCULO LOS PUNTOS 
//ASIGNO LOS PUNTOS EN LA COLUMNA CORRESPONDIENTE

const pointsCalculation = (stat, position) => {
    let totalPoints = 0;
    if (position === 'BASE'){
        totalPoints = (stat.points_scored + stat.assists * 2 + stat.def_rebounds + stat.off_rebounds + stat.threes_scored + stat.steals + stat.blocks - stat.losts);
    }
    if (position === 'ESCOLTA'){
        totalPoints = (stat.points_scored * 2 + stat.assists + stat.def_rebounds + stat.off_rebounds + stat.threes_scored + stat.steals + stat.blocks - stat.losts);
    }
    if (position === 'ALERO'){
        totalPoints = (stat.points_scored + stat.assists + stat.def_rebounds + stat.off_rebounds + 3 * stat.threes_scored + stat.steals + stat.blocks - stat.losts);
    }
    if (position === 'ALA-PIVOT'){
        totalPoints = (stat.points_scored  + stat.assists + stat.def_rebounds * 2 + stat.off_rebounds + stat.threes_scored + stat.steals + stat.blocks - stat.losts);
    }
    if (position === 'PIVOT'){
        totalPoints = (stat.points_scored  + stat.assists + stat.def_rebounds * 2 + stat.off_rebounds * 2 + stat.threes_scored + stat.steals + stat.blocks - stat.losts);
    }

    return totalPoints;
}

(async()=> {
    const game_id = 11;

    const getGameStatsStmt = (id) => `SELECT * FROM games_stats WHERE game_id = ${id};`;
    const getPlayerStmt = (id) => `SELECT * FROM players WHERE id = ${id};`;
    const lastPointsStmt = (id, points) => `UPDATE players SET last_points_scored = ${points} WHERE id=${id};`;
    

    try {
        const db = new Client({
            user: process.env.SUPABASE_USER,
            host: process.env.SUPABASE_HOST,
            database: process.env.SUPABASE_DB,
            password: process.env.SUPABASE_PASSWORD,
            port: process.env.SUPABASE_PORT
        });

        await db.connect();

        const gameStatsQuery = await db.query(getGameStatsStmt(game_id));
        gameStatsRows = gameStatsQuery.rows;
        
        //BUSCO TODOS LOS JUGADORES QUE TIENEN ESTADISTICAS
        for (const stat of gameStatsRows) {
            //BUSCO LA POSICION DEL JUGADOR
            const playerQuery = await db.query(getPlayerStmt(stat.player_id));
            const playerPosition = playerQuery.rows[0].position;
            const playerId = playerQuery.rows[0].id;
            // console.log(playerPosition, playerId);
            await db.query(lastPointsStmt(playerId, pointsCalculation(stat, playerPosition)));
        }


        await db.end();

    } catch(err) {
        console.log("ERROR CALCULATING POINTS: ", err);
    }
})();