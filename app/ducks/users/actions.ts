import { createAction, createApiAction } from '../../utils/actions';
import { GET_Users_TYPES, SELECT_USERS_TYPE } from './types';
import api from './api';

export const getUserss = createApiAction(GET_Users_TYPES, api.getUsersRequest);
export const selectUsers = createAction(SELECT_USERS_TYPE);
