const {Client} = require('pg');
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

(async()=>{
    const game_id = 0;
    const matchweek_id = 0;

    const getGameStatsStmt = (id) => `SELECT * FROM games_stats WHERE game_id = ${id};`;
    const getPlayerPositionStmt = (id) => `SELECT position FROM players WHERE id = ${id};`;
    const getUsersTeams = (id) => `SELECT * FROM users_teams WHERE user_id = ${id};`;
    const getUsersMWTeams =  (matchweek, column, id) => `SELECT * FROM users_teams_mw WHERE matchweek_id = ${matchweek} AND ${column} = ${id}`;
    const sumPointsStmt = (id, points) => `UPDATE users_teams SET points = points + ${points} WHERE user_id =${id};`;

    //BUSCO TODAS LAS ESTADISTICAS PARA UN PARTIDO SUSPENDIDO DE UNA JORNADA
    //BUSCO TODOS LOS EQUIPOS DE LOS USUARIOS DONDE SU MATCHWEEK SEA LA SUSPENDIDA
    //CALCULO LOS PUNTOS DE ESE PARTIDO
    //AGREGO LOS PUNTOS AL EQUIPO PRINCIPAL

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
        const gameStatsRows = gameStatsQuery.rows;

        for (const stat of gameStatsRows){
            //BUSCO LA POSICION DEL JUGADOR
            const playerPositionQuery = await db.query(getPlayerPositionStmt(stat.player_id));
            const playerPosition = playerPositionQuery.rows[0].position;
            playersPoints.push({player_id:stat.player_id, calculatedPoints: pointsCalculation(stat, playerPosition), position: playerPosition});
        }

        for (playerInfo of playersPoints) {
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

            const usersTeamsMW = await db.query(getUsersMWTeams(matchweek_id, playerInfo.player_id));
            const usersTeamsMWRows = usersTeamsMW.rows;

            if (usersTeamsMWRows.length) {
                for (const userTeam of usersTeamsMWRows){
                    await db.query(sumPointsStmt(userTeam.user_id, playerInfo.calculatedPoints));
                }
            }
        }
    }

})();