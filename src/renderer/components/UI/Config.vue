<template>
  <div id="config">
    <div class="title">
      {{ $t("app.config.gameSettings" /* Game Settings */) }}
    </div>
    <div class="block">
      <file-select></file-select>
      <img
        v-if="wowPath.valided"
        class="green"
        :src="require(`@/assets/ok.png`)"
      />
      <img v-else class="red" :src="require(`@/assets/error.png`)" />
      <span v-if="wowPath.valided">
        <p class="label">
          {{ $t("app.config.selectAccount" /* Select Account */) }}
        </p>
        <select v-model="accountValue" class="form-control">
          <option v-for="item in account.choices" :key="item.name">{{
            item.name
          }}</option>
        </select>
        <img
          v-if="account.valided"
          class="green"
          :src="require(`@/assets/ok.png`)"
        />
        <img v-else class="red" :src="require(`@/assets/error.png`)" />
      </span>
    </div>
    <div class="title">
      {{ $t("app.config.wagoSettings" /* Wago Settings */) }}
    </div>
    <div class="block">
      <p class="label">
        {{ $t("app.config.wagoAccount" /* Wago Account (optional) */) }}
      </p>
      <input type="text" v-model="wagoUsername" size="11" />
      <v-button>{{ $t("app.config.ok" /* Ok */) }}</v-button>
      <img
        v-if="wagoUsername"
        class="green"
        :src="require(`@/assets/ok.png`)"
      />
      <br /><br />
      <checkbox v-model="ignoreOwnAuras">
        {{
          $t("app.config.ignoreOwnAuras" /* Ignore auras from your account */)
        }}
      </checkbox>
    </div>
    <div class="title">
      {{ $t("app.config.clientSettings" /* Client Settings */) }}
    </div>
    <div class="block">
      <p class="label">{{ $t("app.config.lang" /* Language */) }}</p>
      <select v-model="lang" class="form-control language">
        <option
          v-for="lang in langs"
          :value="lang.value"
          v-html="lang.text"
          :key="lang.value"
        ></option> </select
      ><br /><br />
      <checkbox v-model="notify">
        {{
          $t(
            "app.config.notification" /* Receive a notification when auras get updated */
          )
        }}
      </checkbox>
      <br /><br />
      <p class="label subtitle">{{ $t("app.config.startup" /* Startup */) }}</p>
      <div class="option">
        <checkbox v-model="autoStart">
          {{
            $t("app.config.autoStart" /* Launch client with your computer */)
          }}
        </checkbox>
      </div>
      <div class="option">
        <checkbox v-model="startMinimized">
          {{ $t("app.config.minimized" /* Start client minimized */) }}
        </checkbox>
      </div>
    </div>
    <br /><br />
    <v-button @click="reset" type="reset">{{
      $t("app.config.reset" /* Reset Settings and Data */)
    }}</v-button>
    <br /><br />
  </div>
</template>

<script>
import fs from "fs";
import path from "path";
import AutoLaunch from "auto-launch";
import { mapState } from "vuex";

import Button from "./Button.vue";
import Checkbox from "./Checkbox.vue";
import FileSelect from "./FileSelect.vue";

const AutoLauncher = new AutoLaunch({
  name: "WeakAuras Companion"
});
export default {
  computed: {
    ...mapState(["config"]),
    account: state => state.config.account,
    accountValue: {
      get() {
        return this.config.account.value;
      },
      set(account) {
        this.$store.commit("config/SET_ACCOUNT", { value: account });
      }
    },
    autoStart: {
      get() {
        return this.config.autoStart;
      },
      set(autoStart) {
        this.$store.commit("config/SET_AUTO_START", autoStart);
      }
    },
    ignoreOwnAuras: {
      get() {
        return this.config.ignoreOwnAuras;
      },
      set(ignoreOwnAuras) {
        this.$store.commit("config/SET_IGNORE_OWN_AURAS", ignoreOwnAuras);
      }
    },
    lang: {
      get() {
        return this.config.lang;
      },
      set(lang) {
        this.$store.commit("config/SET_LANG", lang);
      }
    },
    notify: {
      get() {
        return this.config.notify;
      },
      set(notify) {
        this.$store.commit("config/SET_NOTIFY", notify);
      }
    },
    startMinimized: {
      get() {
        return this.config.startMinimized;
      },
      set(startMinimized) {
        this.$store.commit("config/SET_START_MINIMIZED", startMinimized);
      }
    },
    wagoUsername: {
      get() {
        return this.config.wagoUsername;
      },
      set(wagoUsername) {
        this.$store.commit("config/SET_WAGO_USERNAME", wagoUsername);
      }
    },
    wowPath: {
      get() {
        return this.config.wowPath;
      },
      set(wowPath) {
        this.$store.commit("config/SET_WOW_PATH", { wowPath });
      }
    }
  },
  data() {
    return {
      langs: [
        { value: "de", text: "Deutsch (de)" },
        { value: "en", text: "English (en)" },
        { value: "fr", text: "Français (fr)" },
        { value: "ru", text: "Русский (ru)" }
      ]
    };
  },
  components: {
    Checkbox,
    FileSelect,
    "v-button": Button
  },
  methods: {
    reset() {
      this.$parent.reset();
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    "config.autoStart": function() {
      if (this.config.autostart) {
        AutoLauncher.enable();
      } else {
        AutoLauncher.disable();
      }
    },
    // eslint-disable-next-line func-names
    "config.wowPath.value": function() {
      if (this.config.wowPath.value) {
        // test if ${wowpath}\WTF\Account exists
        const accountFolder = path.join(
          this.config.wowPath.value,
          "WTF",
          "Account"
        );
        fs.access(accountFolder, fs.constants.F_OK, err => {
          if (!err) {
            // add option for each account found
            const choices = fs
              .readdirSync(accountFolder)
              .filter(file => file !== "SavedVariables")
              .map(file => ({ name: file }));

            this.$store.commit("config/SET_ACCOUNT", { choices });
            this.$store.commit("config/SET_WOW_PATH", { valided: true });
          } else {
            this.$store.commit("config/SET_WOW_PATH", { valided: false });
          }
        });
      }
    },
    // eslint-disable-next-line func-names
    "config.account.value": function() {
      if (this.config.wowPath.valided && !!this.config.account.value) {
        const WeakAurasSavedVariable = path.join(
          this.config.wowPath.value,
          "WTF",
          "Account",
          this.config.account.value,
          "SavedVariables",
          "WeakAuras.lua"
        );
        fs.access(WeakAurasSavedVariable, fs.constants.F_OK, err => {
          if (!err) {
            this.$store.commit("config/SET_ACCOUNT", { valided: true });
          } else {
            this.$store.commit("config/SET_ACCOUNT", { valided: false });
          }
        });
      }
    },
    // eslint-disable-next-line func-names
    "config.lang": function() {
      this.$i18n.locale = this.config.lang;
    }
  }
};
</script>

<style scoped>
#config {
  padding: 5px 0 5px 30px;
  text-align: left;
  overflow: auto;
  height: 100%;
  width: 100%;
}
label,
.label {
  color: #eee;
  margin: 2px 0 3px;
  font-size: 14px;
}
.red,
.green {
  border-radius: 2px;
  width: 27px;
  height: 27px;
  vertical-align: top;
}
input,
select,
.fakeinput {
  padding: 5px;
  font-size: small;
  border-radius: 2px;
  border: none;
  background-color: #eee;
  color: #1e1e1e;
}
#config .title:first-child {
  margin-top: 5px;
}
.title {
  font-size: 25px;
  margin: 25px 0 10px;
  font-weight: 600;
  padding: 4px 5px 4px;
  border-left: 2px solid rgb(255, 209, 0);
  background-color: rgba(0, 0, 0, 0.1);
}
.block {
  margin-left: 10px;
  font-size: 15px;
}
.option {
  margin-bottom: 5px;
}
.subtitle {
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
  color: white;
}
.form-control.language {
  width: 110px;
}
</style>
