const { Client } = require("pg");
const { DB } = require('../../config');

const data = [
    {name:'Aguada', badge:'/route/to/badge'},
    {name:'Biguá', badge:'/route/to/badge'},
    {name:'Cordón', badge:'/route/to/badge'},
    {name:'Defensor Sporting', badge:'/route/to/badge'},
    {name:'Goes', badge:'/route/to/badge'},
    {name:'Hebraica Macabi', badge:'/route/to/badge'},
    {name:'Larre Borger', badge:'/route/to/badge'},
    {name:'Malvín', badge:'/route/to/badge'},
    {name:'Nacional', badge:'/route/to/badge'},
    {name:'Peñarol', badge:'/route/to/badge'},
    {name:'Trouville', badge:'/route/to/badge'},
    {name:'Urupan', badge:'/route/to/badge'},
];

(async() => {
    const addTeamStmt = (name, badge) =>`
    INSERT INTO teams (name, badge) VALUES ('${name}', '${badge}');
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
            const query = addTeamStmt(element.name, element.badge);
            await db.query(query);
        }
    
        await db.end();
    } catch(err) {
        console.log("ERROR ADDING ELEMENTS: ", err);
    }

})();