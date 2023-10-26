const { Client } = require("pg");
const { DB } = require('../../config');

const data = [
    {first_name: 'Jugador', last_name: '1', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 8},
    {first_name: 'Jugador', last_name: '2', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 9},
    {first_name: 'Jugador', last_name: '3', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 10},
    {first_name: 'Jugador', last_name: '4', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 11},
    {first_name: 'Jugador', last_name: '5', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 12},
    {first_name: 'Jugador', last_name: '6', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 13},
    {first_name: 'Jugador', last_name: '7', height: 200, age: new Date('1998-12-30'), position: 'PG', value: 100, team_id: 14},
];

(async() => {
    const addTeamStmt = (first_name, last_name, height, age, position,value, team_id) =>`
    INSERT INTO players (first_name, last_name, height, age, position, value, team_id) VALUES ('${first_name}', '${last_name}', '${height}', '${age.toISOString()}', '${position}', '${value}', '${team_id}');
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
            const query = addTeamStmt(element.first_name, element.last_name, element.height, element.age, element.position, element.value, element.team_id);
            await db.query(query);
        }
    
        await db.end();
    } catch(err) {
        console.log("ERROR ADDING ELEMENTS: ", err);
    }

})();