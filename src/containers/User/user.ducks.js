import { createAction, handleActions } from 'redux-actions';
import { List } from 'immutable';

const initialState = {
  users: [],
  me: null,
};

export const login = createAction('USER_LOGIN');
export const logout = createAction('USER_LOGOUT');

export default handleActions(
  {
    [login](
      state,
      {
        payload: { id, users },
      }
    ) {
      if (!id || !users || users.indexOf(id) === -1) {
        return state;
      }
      return {
        ...state,
        me: id,
        users,
      };
    },
    [logout](state) {
      const users = List(state.users).delete(state.users.indexOf(state.me));
      return {
        ...state,
        me: null,
        users,
      };
    },
  },
  initialState
);
