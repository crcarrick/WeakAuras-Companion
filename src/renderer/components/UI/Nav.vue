<template>
  <header>
    <v-button type="menu" @click="navigateTo('dashboard')">{{
      $t("app.menu.main" /* Main */)
    }}</v-button>
    <span class="seperator">|</span>
    <v-button type="menu" @click="navigateTo('config')">{{
      $t("app.menu.settings" /* Settings */)
    }}</v-button>
    <span class="seperator">|</span>
    <v-button type="menu" @click="navigateTo('about')">{{
      $t("app.menu.about" /* About */)
    }}</v-button>
  </header>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    "v-button": Button
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    }
  },
  name: "wa-nav"
};
</script>

<style scoped>
header {
  text-align: right;
  height: 50px;
  margin: 15px 15px 0 0;
}
</style>
