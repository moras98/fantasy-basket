const { Client } = require("pg");
const { DB } = require('./config');

(async() => {
    const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        email           VARCHAR(50) UNIQUE NOT NULL,
        username         VARCHAR(50) UNIQUE NOT NULL,
        password        TEXT   
    );
    `;

    const teamsTableStmt = `
    CREATE TABLE IF NOT EXISTS teams (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name            VARCHAR(100),
        badge           TEXT
    );
    `;
    
    const playersTableStmt = `
    CREATE TABLE IF NOT EXISTS players (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        first_name      VARCHAR(50),
        last_name       VARCHAR(50),
        height          INT,
        age             DATE,
        position        VARCHAR(50) CHECK (position IN ('BASE', 'ESCOLTA', 'ALERO', 'ALA-PIVOT', 'PIVOT')),
        value           INT,
        team_id         INT,
        FOREIGN KEY (team_id) REFERENCES teams(id)
    );
    `;

    const gamesTableStmt = `
    CREATE TABLE IF NOT EXISTS games (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        date            DATE,
        team1_score     INT,
        team2_score     INT,
        team1_id        INT,
        team2_id        INT,
        matchweek_id    INT
        FOREIGN KEY (team1_id) REFERENCES teams(id),
        FOREIGN KEY (team2_id) REFERENCES teams(id),
        FOREIGN KEY (matchweek_id) REFERENCE matchweeks(id)
    );
    `;

    const games_statsTableStmt = `
    CREATE TABLE IF NOT EXISTS games_stats (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        game_id         INT,
        player_id       INT,
        time_played     TIME,
        points_scored   INT,
        off_rebounds    INT,
        def_rebounds    INT,
        assists         INT,
        FOREIGN KEY (game_id) REFERENCES games(id),
        FOREIGN KEY (player_id) REFERENCES players(id)
    );
    `;    

    const users_teamsTableStmt = `
    CREATE TABLE IF NOT EXISTS users_teams (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        money           INT     DEFAULT 1000000,
        points          INT     DEFAULT 0,
        user_id         INT,
        player1_id      INT,
        player2_id      INT,
        player3_id      INT,
        player4_id      INT,
        player5_id      INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (player1_id) REFERENCES players(id),
        FOREIGN KEY (player2_id) REFERENCES players(id),
        FOREIGN KEY (player3_id) REFERENCES players(id),
        FOREIGN KEY (player4_id) REFERENCES players(id),
        FOREIGN KEY (player5_id) REFERENCES players(id),
    );
    `;

    const matchweeksTableStmt =`
    CREATE TABLE IF NOT EXISTS matchweeks (
        id              INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        n_matchweek     INT     UNIQUE NOT NULL,
        start_date      TIMESTAMP WITH TIMEZONE
        end_date      TIMESTAMP WITH TIMEZONE
    );`;

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
        await db.query(usersTableStmt);
        await db.query(teamsTableStmt);
        await db.query(playersTableStmt);
        await db.query(gamesTableStmt);
        await db.query(games_statsTableStmt);
        await db.query(users_teamsTableStmt);
        await db.query(matchweeksTableStmt);
    
        await db.end();
    } catch(err) {
        console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
    }

})();
