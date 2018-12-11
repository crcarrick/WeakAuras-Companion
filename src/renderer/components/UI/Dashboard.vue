<template>
  <div v-if="configStep === 0" id="dashboard">
    <refreshButton
      :usable="config.wowpath.valided && config.account.valided"
      :fetching="fetching"
      :lastUpdate="schedule.lastUpdate"
    ></refreshButton>
    <br />
    <div class="updates" v-if="aurasFilteredAndSorted.length > 0">
      <span v-if="showNewUpdate" class="showNewUpdate">{{
        $t(
          "app.main.newUpdates" /* We found the following updates for you, they can now be applied in-game: */
        )
      }}</span>
      <span v-else>{{ $t("app.main.updates" /* Updates */) }}</span>
    </div>
    <div id="aura-list">
      <Aura
        v-for="aura in aurasFilteredAndSorted"
        :aura="aura"
        :key="aura.slug"
      ></Aura>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard"
};
</script>

<style scoped></style>
