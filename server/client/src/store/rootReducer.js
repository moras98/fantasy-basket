import { combineReducers } from 'redux';
import authReducer from './auth/Auth.reducers';

import userReducer from './user/User.reducers';
import teamReducers from './team/Team.reducers';
import playerReducers from './player/Player.reducers';
import gameStatsReducers from './game_stats/GameStats.reducers';
import GameReducers from './game/Game.reducers';
import UserTeamReducers from './users_teams/UsersTeams.reducers';
import UsersReducers from './users/Users.reducers';
import MatchweekReducers from './matchweek/MatchWeek.reducers';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  teams: teamReducers,
  players: playerReducers,
  game_stats: gameStatsReducers,
  games: GameReducers,
  usersTeams: UserTeamReducers,
  users: UsersReducers,
  matchweeks: MatchweekReducers,
});