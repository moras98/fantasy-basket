const { Client } = require("pg");
const { DB } = require('../../config');

const data = [
    {date: new Date('2022-12-30'), team1_score: 80, team2_score: 90, team1_id: 8, team2_id: 9},
    {date: new Date('2022-12-30'), team1_score: 80, team2_score: 90, team1_id: 10, team2_id: 11},
    {date: new Date('2022-12-30'), team1_score: 80, team2_score: 90, team1_id: 12, team2_id: 13},
    {date: new Date('2022-12-30'), team1_score: 80, team2_score: 90, team1_id: 14, team2_id: 15},
];

(async() => {
    const addTeamStmt = (date, team1_score, team2_score, team1_id, team2_id) =>`
    INSERT INTO games (date, team1_score, team2_score, team1_id, team2_id) VALUES ('${date.toISOString()}', '${team1_score}', '${team2_score}', '${team1_id}', '${team2_id}');
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
            const query = addTeamStmt(element.date, element.team1_score, element.team2_score, element.team1_id, element.team2_id);
            await db.query(query);
        }
    
        await db.end();
    } catch(err) {
        console.log("ERROR ADDING ELEMENTS: ", err);
    }

})();