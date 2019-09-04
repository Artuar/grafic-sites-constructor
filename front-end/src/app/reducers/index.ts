import { Site } from '../sites/sites.service';

import { User } from '../core/services/get-user.service';
import { SitesComponent } from '../sites/sites.component';

export interface StoreState {
  sites: Site[];
  current: number | undefined;
  user: User | undefined;
}
const DEFAULT_STATE: StoreState = {
  sites: [],
  current: undefined,
  user: undefined
};

export function appReduсer(state = DEFAULT_STATE, {type, payload}) {
  switch (type) {
    case 'SET_USER':
      return {...state, user: payload};
    case 'SET_SITES':
      return {...state, sites: payload};
    case 'SET_SITE':
      return {
        ...state,
        sites: state.sites.length
          ? state.sites.map(site => site.id === payload.id ? payload : site)
          : [payload]
        };
    case 'ADD_SITE':
      return {...state, sites: [payload, ...state.sites]};
    case 'UPDATE_SITE':
      return {
        ...state,
        sites: state.sites.map(site => site.id === payload.id ? payload : site)
      };
    case 'DELETE_SITE':
      return {...state, sites: state.sites.filter(site => site.id !== payload.id)};
    default:
      return {...state};
  }
}