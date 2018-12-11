/* eslint-disable no-param-reassign */

const getInitialState = () => ({
  wowPath: {
    value: null,
    valided: false
  },
  account: {
    value: null, // name of the account selected
    valided: false,
    choices: []
  },
  wagoUsername: null, // ignore your own auras
  ignoreOwnAuras: true,
  autoStart: false,
  startMinimized: false,
  notify: true,
  lang: "en"
});

const initialState = getInitialState();

// Actions are asynchronous transforms of state
const actions = {};

const getters = {};

// Mutations are synchronous transforms of state
const mutations = {
  RESET: function reset(state) {
    Object.assign(state, getInitialState());
  },
  SET_ACCOUNT: function setAccount(state, payload) {
    state.account = { ...state.account, ...payload };
  },
  SET_AUTO_START: function setAutoStart(state, payload) {
    state.autoStart = payload;
  },
  SET_IGNORE_OWN_AURAS: function setIgnoreOwnAuras(state, payload) {
    state.ignoreOwnAuras = payload;
  },
  SET_LANG: function setLang(state, payload) {
    state.lang = payload;
  },
  SET_NOTIFY: function setNotify(state, payload) {
    state.notify = payload;
  },
  SET_START_MINIMIZED: function setStartMinimized(state, payload) {
    state.startMinimized = payload;
  },
  SET_WAGO_USERNAME: function setWagoUsername(state, payload) {
    state.wagoUsername = payload;
  },
  SET_WOW_PATH: function setWowPath(state, payload) {
    state.wowPath = { ...state.wowPath, ...payload };
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  getters,
  mutations
};
