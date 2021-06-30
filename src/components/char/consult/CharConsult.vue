<template>
  <v-container>
    <CharInfo :char="char" :location="location"></CharInfo>
    <v-divider class="mx-6 my-6"></v-divider>
    <CharEpisodeTable :episode-list="episodeList"></CharEpisodeTable>
    <v-row justify="center" align="center" class="mt-5">
      <v-col cols="auto">
        <v-btn color="primary" @click="onBackClick()"> Retour à la liste</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { CharModel } from "@/lib/models/char/char.model";
import { LocationModel } from "@/lib/models/location/location.model";
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import CharInfo from "./shared/CharInfo.vue";
import CharEpisodeTable from "./shared/CharEpisodeTable.vue";
import { EpisodeModel } from "@/lib/models/episode/episode.model";

interface CharConsultPropOptions {
  char: CharModel;
  location: LocationModel;
  episodeList: EpisodeModel[];
}

export default defineComponent<CharConsultPropOptions>({
  components: {
    CharInfo,
    CharEpisodeTable,
  },
  props: {
    char: {
      type: Object,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    episodeList: {
      type: Array,
      required: true,
    },
  },
  setup(_props, { root }) {
    const data = reactive({});
    function onBackClick(): void {
      root.$router.push({
        name: "characters",
      });
    }
    return {
      ...toRefs(data),
      onBackClick,
    };
  },
});
</script>

<style lang="scss"></style>
