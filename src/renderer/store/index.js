import Vue from "vue";
import Vuex from "vuex";
import createLogger from "./logger";

import config from "./modules/config";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules: {
    config
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

// if (module.hot) {
//   // accept actions and mutations as hot modules
//   module.hot.accept(["./modules/config"], () => {
//     // require the updated modules
//     // have to add .default here due to babel 6 module output
//     // eslint-disable-next-line global-require
//     const newModuleConfig = require("./modules/config").default;
//     // swap in the new modules and mutations
//     store.hotUpdate({
//       modules: {
//         config: newModuleConfig
//       }
//     });
//   });
// }

export default store;
