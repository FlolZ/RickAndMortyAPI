<template>
  <div>
    <h1>Apparition dans les épisodes</h1>
    <v-data-table
      :headers="headers"
      :items="episodeList"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.characters`]="{ item }">
        <v-row>
          <v-col cols="auto"> Voir la liste </v-col>
          <v-col cols="auto">
            <CharListDialog :char-url-list="item.characters"></CharListDialog>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import CharListDialog from "./CharListDialog.vue";
interface CharEpisodeTablePropOptions {
  episodeList: string[];
}
export default defineComponent<CharEpisodeTablePropOptions>({
  components: {
    CharListDialog,
  },
  props: {
    episodeList: {
      type: Array,
      required: true,
    },
  },
  setup(_props) {
    const data = reactive({
      headers: [
        { text: "Nom", value: "name" },
        { text: "Episode", value: "episode" },
        { text: "Date de sortie", value: "air_date" },
        { text: "Personnages", value: "characters" },
      ],
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss"></style>
