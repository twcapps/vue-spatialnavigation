import * as Vuex from "vuex";
import { State } from "./state";
export declare const createStore: () => Vuex.Store<State>;
/*************************************************/
/*************************************************/
export declare const readSplashScreenVisibility: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>) => boolean;
export declare const readLoaderVisibility: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>) => boolean;
export declare const readLoggedInState: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>) => boolean;
/*************************************************/
/*************************************************/
export declare const commitSplashScreenVisibility: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>, payload: boolean) => void;
export declare const commitLoaderVisibility: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>, payload: boolean) => void;
export declare const commitLoggedInState: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>, payload: boolean) => void;
/*************************************************/
/*************************************************/
export declare const dispatchLoginUser: (store: Vuex.ActionContext<State, State> | Vuex.Store<State>, payload: boolean) => Promise<{}>;
