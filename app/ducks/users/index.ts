import { AxiosError } from "axios";
import { Users } from "interfaces/UserPayloads";

interface IUsersState {
  list: {
    data: Users[];
    isLoading: boolean;
    error: AxiosError;
  };
  selectedUser: Users;
}

const initialState: IUsersState = {
  list: {
    data: [],
    isLoading: false,
    error: null,
  },
  selectedUser: null,
};

const reducer = (state = initialState, action) => {
  const MasterMap = {
    "USERS/GET_USERS_LIST_REQUEST": (): IUsersState => ({
      ...state,
      list: {
        ...state.list,
        isLoading: true,
        error: null,
      },
    }),
    "USERS/GET_USERS_LIST_SUCCESS": (): IUsersState => ({
      ...state,
      list: {
        ...state.list,
        data: action?.payload?.items,
        isLoading: false,
        error: null,
      },
    }),
    "USERS/GET_USERS_LIST_FAILURE": (): IUsersState => ({
      ...state,
      list: {
        ...state.list,
        error: action?.payload,
        isLoading: false,
      },
    }),
    "USERS/SELECT_USERS": (): IUsersState => ({
      ...action.payload,
    }),
  };

  try {
    return MasterMap[action?.type]();
  } catch {
    return initialState;
  }
};

export default reducer;
