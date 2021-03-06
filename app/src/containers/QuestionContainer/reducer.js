import update from 'react-addons-update';
import * as types from './constants';

export const initialState = {
  isLoading: false,
  name: null,
  isShowingModal: false,
  contributors: [
    {
      name: 'Test',
      github: 'test',
      bio: 'Experienced Software Engineer specializing in implementing cutting-edge ' +
        'technologies in a multitude of domains, focusing on React and Front End.  ' +
        'Weekend Data Scientist and Functional Programmer.',
      avatar: 'https://avatars.githubusercontent.com/u/13810084?v=3',
    },
  ],
};

const landingReducer =
  (state = initialState, action) => {
    switch (action.type) {
      case types.OPEN_MODAL:
        return update(state, {
          isShowingModal: {
            $set: true,
          },
        });
      case types.CLOSE_MODAL:
        return update(state, {
          isShowingModal: {
            $set: false,
          },
        });
      case types.LOAD_DATA_INITIATION:
        return update(state, {
          isShowingModal: {
            $set: false,
          },
          isLoading: {
            $set: true,
          },
          name: {
            $set: action.name,
          },
        });
      case types.LOAD_DATA_SUCCESS:
        return update(state, {
          isLoading: {
            $set: false,
          },
        });
      default:
        return state;
    }
  };

export default landingReducer;
