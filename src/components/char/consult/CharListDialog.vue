<template>
  <div>
    <div>
      <v-icon @click="openDialog()">mdi-eye-outline</v-icon>
    </div>

    <v-dialog
      v-if="dialog"
      v-model="dialog"
      scrollable
      max-width="850px"
      @close="closeDialog"
    >
      <v-card>
        <v-card-title>Liste des personnages de l'épisode</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="showChard">
          <v-row justify="space-around">
            <v-col
              class="col-10 col-md-6"
              v-for="char in charList.data"
              :key="char.id"
            >
              <ListCard :short="true" :char="char" :loading="loading">
                {{ char }}
              </ListCard>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from "@vue/composition-api";
import ListCard from "../../shared/list-card/ListCard.vue";
import { extractNumberFromUrl } from "@/helper/number.helper";

interface CharListDialogPropOptions {
  charUrlList: string[];
}

export default defineComponent<CharListDialogPropOptions>({
  components: {
    ListCard,
  },
  props: {
    charUrlList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { root }) {
    const data = reactive({
      dialog: false,
    });

    function loadCharList(): void {
      const params = props.charUrlList.map((charUrl: string) =>
        extractNumberFromUrl(charUrl)
      );
      root.$store.dispatch("charStore/getMultipleChar", params);
    }

    const loading = computed(() => {
      return root.$store.state.charStore.loading;
    });

    const charList = computed(() => {
      return root.$store.state.charStore.charList;
    });

    function openDialog(): void {
      loadCharList();
      data.dialog = true;
    }

    function closeDialog() {
      data.dialog = false;
    }

    const error = computed(() => {
      return root.$store.state.charStore.error;
    });

    const showChard = computed(() => {
      return charList.value && !error.value;
    });

    return {
      ...toRefs(data),
      charList,
      loading,
      openDialog,
      closeDialog,
      showChard,
    };
  },
});
</script>

<style lang="scss"></style>
