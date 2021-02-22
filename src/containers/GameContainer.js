import { connect } from 'react-redux';
import {
  LOAD_NEXT_LEVEL,
  MOVE,
  START_GAME,
  RESTART_LEVEL,
  SHOW_LEADERBOARD,
  SHOW_MENU,
  ADD_SCORE_TO_LEADERBOARD,
} from '../constants/actions';

import Main from '../components/Main';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      movePlayer: direction => dispatch({ type: MOVE, direction }),
      showLeaderBoard: () => dispatch({ type: SHOW_LEADERBOARD }),
      addScoreToLeaderboard: score => dispatch({ type: ADD_SCORE_TO_LEADERBOARD, score }),
      showMenu: () => dispatch({ type: SHOW_MENU }),
      restartMap: () => dispatch({ type: RESTART_LEVEL }),
      startNewGame: () => dispatch({ type: START_GAME }),
      loadNextLevel: () => dispatch({ type: LOAD_NEXT_LEVEL }),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
