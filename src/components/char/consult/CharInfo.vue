<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-avatar size="300">
          <img :src="char.image" alt="John" />
        </v-avatar>
      </v-col>

      <v-col cols="8" class="ml-8">
        <v-row>
          <v-col>
            <h1>Information</h1>
            <v-divider class="mx-4 my-6"></v-divider>

            <v-row justify="space-around">
              <CharRowInfo
                :icon="'mdi-account-circle'"
                :infoType="'Nom'"
                :info="char.name"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-gender-transgender'"
                :infoType="'Genre'"
                :info="char.gender"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-spider'"
                :infoType="'Espèce'"
                :info="char.species"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-robot-happy'"
                :infoType="'Type'"
                :info="char.type ? char.type : 'Inconnu'"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-record'"
                :infoType="'Status'"
                :info="char.status"
                :icon-color="charStatusIconColor"
              ></CharRowInfo>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h1>Location</h1>
            <v-divider class="mx-4 my-6"></v-divider>

            <v-row justify="space-around">
              <CharRowInfo
                :icon="'mdi-earth'"
                :infoType="'Nom'"
                :info="location.name"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-google-maps'"
                :infoType="'Dimension'"
                :info="location.dimension"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-crosshairs-gps'"
                :infoType="'Type'"
                :info="location.type"
              ></CharRowInfo>

              <CharRowInfo
                :icon="'mdi-view-list'"
                :infoType="'Liste des résidents'"
                info="Voir la liste"
              >
                <template v-slot:default>
                  <CharListDialog
                    :char-url-list="location.residents"
                  ></CharListDialog
                ></template>
              </CharRowInfo>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { CharModel } from "@/lib/models/char/char.model";
import { LocationModel } from "@/lib/models/location/location.model";
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from "@vue/composition-api";
import CharListDialog from "./CharListDialog.vue";
import CharRowInfo from "./CharRowInfo.vue";

interface CharInfotPropOptions {
  char: CharModel;
  location: LocationModel;
}
export default defineComponent<CharInfotPropOptions>({
  components: {
    CharRowInfo,
    CharListDialog,
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
  },
  setup(props) {
    const data = reactive({});

    const charStatusIconColor = computed(() => {
      if (props.char.status === "Dead") {
        return "red";
      } else if (props.char.status === "Alive") {
        return "green";
      } else {
        return "grey";
      }
    });

    return {
      ...toRefs(data),
      charStatusIconColor,
    };
  },
});
</script>

<style lang="scss"></style>
