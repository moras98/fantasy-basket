const { Client } = require("pg");
const { DB } = require('../../config');

const data = [
    {game_id: 1, player_id:1, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 1, player_id:2, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 1, player_id:3, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 1, player_id:4, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 2, player_id:1, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 2, player_id:2, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 2, player_id:3, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 2, player_id:4, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 3, player_id:1, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 3, player_id:2, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 3, player_id:3, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 3, player_id:4, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 4, player_id:1, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 4, player_id:2, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 4, player_id:3, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
    {game_id: 4, player_id:4, time_played: '00:38:50', points_scored: 20, off_rebounds: 10, def_rebounds: 2, assists: 5},
];

(async() => {
    const addGameStatStmnt = (game_id, player_id, time_played, points_scored, off_rebounds, def_rebounds, assists) =>`
    INSERT INTO games_stats (game_id, player_id, time_played, points_scored, off_rebounds, def_rebounds, assists) VALUES ('${game_id}', '${player_id}', '${time_played}', '${points_scored}', '${off_rebounds}', '${def_rebounds}', '${assists}');
    `;

    try {
        const db = new Client({
            user: DB.PGUSER,
            host: DB.PGHOST,
            database: DB.PGDATABASE,
            password: DB.PGPASSWORD,
            port: DB.PGPORT
        });

        await db.connect();
  
        // Create tables on database
        for (const element of data) {
            const query = addGameStatStmnt(element.game_id, element.player_id, element.time_played, element.points_scored, element.off_rebounds, element.def_rebounds, element.assists);
            await db.query(query);
        }
    
        await db.end();
    } catch(err) {
        console.log("ERROR ADDING ELEMENTS: ", err);
    }

})();