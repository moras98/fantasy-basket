const authRouter = require('./auth');
const userRouter = require('./user');
const userTeamRouter = require('./user_team');
const teamRouter = require('./team');
const playerRouter = require('./player');
const gameRouter = require('./game');
const gameStatsRouter = require('./game_stats');
const matchWeekRouter = require('./matchweek');

module.exports = (app, passport) => {
  authRouter(app, passport);
  userRouter(app);
  userTeamRouter(app);
  teamRouter(app);
  playerRouter(app);
  gameRouter(app);
  gameStatsRouter(app);
  matchWeekRouter(app);
}