import { createConstants, createApiConstants } from '../../utils/constant';
import { SELECT_USERS } from './constants';

export const NAMESPACE = 'USERS';
export const GET_Users_TYPES = createApiConstants(NAMESPACE, 'get_users_list');
export const SELECT_USERS_TYPE = `${NAMESPACE}/${SELECT_USERS}`