import { AxiosError } from "axios";
import { Movie } from "interfaces/MoviePayloads";

interface IMoviesState {
  list: {
    data: Movie[];
    isLoading: boolean;
    error: AxiosError;
  };
  selectedMovie: Movie;
}

const initialState: IMoviesState = {
  list: {
    data: [],
    isLoading: false,
    error: null,
  },
  selectedMovie: null,
};

const reducer = (state = initialState, action) => {
  console.log({action});
  const MasterMap = {
    "USERS/GET_USERS_LIST_REQUEST": (): IMoviesState => ({
      ...state,
      list: {
        ...state.list,
        isLoading: true,
      },
    }),
    "USERS/GET_USERS_LIST_SUCCESS": (): IMoviesState => ({
      ...state,
      list: {
        ...state.list,
        data: action?.payload?.items,
        isLoading: false,
      },
    }),
    "USERS/GET_USERS_LIST_FAILURE": (): IMoviesState => ({
      ...state,
      list: {
        ...state.list,
        error: action?.payload,
        isLoading: false,
      },
    }),
    "USERS/SELECT_USERS": (): IMoviesState => ({
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
