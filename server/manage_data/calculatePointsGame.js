const { Client } = require("pg");
require('dotenv').config();


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
    const game_id = 1;

    const getGameStatsStmt = (id) => `SELECT * FROM games_stats WHERE game_id = ${id};`;
    const getPlayerPositionStmt = (id) => `SELECT position FROM players WHERE id = ${id};`;
    const getUsersTeams = (column, id) => `SELECT * FROM users_teams WHERE ${column} = ${id};`;
    const sumPointsStmt = (id, points) => `UPDATE users_teams SET points = points + ${points} WHERE id =${id};`;
    const lastPointsStmt = (id, points) => `UPDATE users_teams SET last_points = last_points + ${points} WHERE id=${id};`;
    const lastPointsPlayerStmt = (id, points) => `UPDATE players SET last_points_scored = ${points} WHERE id=${id};`;

    try {
        const db = new Client({
            user: process.env.SUPABASE_USER,
            host: process.env.SUPABASE_HOST,
            database: process.env.SUPABASE_DB,
            password: process.env.SUPABASE_PASSWORD,
            port: process.env.SUPABASE_PORT
        });

        const playersPoints = [];
        await db.connect();

        const gameStatsQuery = await db.query(getGameStatsStmt(game_id));
        gameStatsRows = gameStatsQuery.rows;
        
        //BUSCO TODOS LOS JUGADORES QUE TIENEN ESTADISTICAS
        for (const stat of gameStatsRows) {
            //BUSCO LA POSICION DEL JUGADOR
            const playerPositionQuery = await db.query(getPlayerPositionStmt(stat.player_id));
            const playerPosition = playerPositionQuery.rows[0].position;
            await db.query(lastPointsPlayerStmt(stat.player_id, pointsCalculation(stat, playerPosition)));
            playersPoints.push({player_id:stat.player_id, calculatedPoints: pointsCalculation(stat, playerPosition), position: playerPosition});
        }

        //OPCION 2 BUSCO TODOS LOS EQUIPOS QUE POR POSICION(COLUMNA) CONTENGAN AL JUGADOR EN CUESTION Y SUMO SUS PUNTOS
        for (playerInfo of playersPoints) {
            //COLUMN NAME
            const position = playerInfo.position;
            let column = '';
            if (position === 'BASE'){
                column = 'player1_id'
            }
            if (position === 'ESCOLTA'){
                column = 'player2_id'
            }
            if (position === 'ALERO'){
                column = 'player3_id'
            }
            if (position === 'ALA-PIVOT'){
                column = 'player4_id'
            }
            if (position === 'PIVOT'){
                column = 'player5_id'
            }


            const usersTeams = await db.query(getUsersTeams(column, playerInfo.player_id));
            const usersTeamsRows = usersTeams.rows;
            
            if (usersTeamsRows.length) {
               for (const userTeam of usersTeamsRows){
                    await db.query(sumPointsStmt(userTeam.id, playerInfo.calculatedPoints));
                    await db.query(lastPointsStmt(userTeam.id, playerInfo.calculatedPoints));
               }
            }
            
        }


        await db.end();

    } catch(err) {
        console.log("ERROR CALCULATING POINTS: ", err);
    }
})();