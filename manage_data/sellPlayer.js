const { Client } = require("pg");
require('dotenv').config();


(async()=>{
    const player_to_sell_id = 115;
    const getPlayerPositionStmt = (id) => `SELECT position FROM players WHERE id = ${id};`;
    const getPlayerValueStmt = (id)=> `SELECT value FROM players WHERE id = ${id};`;
    const getUsersTeams = (column, id) => `SELECT * FROM users_teams WHERE ${column} = ${id};`;
    const removePlayer = (column, id) => `UPDATE users_teams SET ${column} = NULL WHERE id = ${id};`;
    const addMoney = (id, value) => `UPDATE users_teams SET money = monney + ${value} WHERE id=${id};`;
    const deletePlayer = (id) => `DELETE FROM players WHERE id = ${id}`;
    
    try {
    const db = new Client({
        user: process.env.SUPABASE_USER,
        host: process.env.SUPABASE_HOST,
        database: process.env.SUPABASE_DB,
        password: process.env.SUPABASE_PASSWORD,
        port: process.env.SUPABASE_PORT
    });
    
    await db.connect();
    
    const playerPositionQuery = await db.query(getPlayerPositionStmt(player_to_sell_id));
    const position = playerPositionQuery.rows[0].position;
    
    const playerValueQuery = await db.query(getPlayerValueStmt(player_to_sell_id));
    const playerValue = playerValueQuery.rows[0].value;
    
    let column = "";
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
    
    const usersTeams = await db.query(getUsersTeams(column, player_to_sell_id));
    const usersTeamsRows = usersTeams.rows;
    if (usersTeamsRows.length) {
        for (const userTeam of usersTeamsRows){
            await db.query(addMoney(userTeam.id, playerValue));
            await db.query(removePlayer(column, userTeam.id));
       }
    }
    
    await db.query(deletePlayer(player_to_sell_id));
    
    await db.end();
    
    } catch(err){
    console.log("ERROR SELLING PLAYER: ", err);
    }
})();
