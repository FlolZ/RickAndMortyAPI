<template>
  <v-container>
    <Header />
    <SearchBar @onSearchClick="onSearchChar($event)" :query="queryString">
      <v-row>
        <v-col cols="auto">
          <h2>Status</h2>

          <v-select
            clearable
            label="Status"
            v-model="queryString.status"
            item-value="value"
            :items="statusList"
          >
            <template v-slot:selection="{ item }">
              {{ item.key }}
            </template>

            <template v-slot:item="{ item }">
              {{ item.key }}
            </template>
          </v-select>
        </v-col>

        <v-col cols="auto" class="ml5">
          <h2>Genre</h2>
          <v-select
            clearable
            label="Genre"
            v-model="queryString.gender"
            item-value="value"
            :items="genderList"
          >
            <template v-slot:selection="{ item }">
              {{ item.key }}
            </template>

            <template v-slot:item="{ item }">
              {{ item.key }}
            </template>
          </v-select>
        </v-col>
      </v-row>
    </SearchBar>

    <div v-if="!error">
      <CharList :loading="isLoading" :charList="charList"></CharList>
      <v-row justify="center">
        <v-col cols="6">
          <v-container class="max-width">
            <Pagination
              :info="info"
              :query="queryString"
              @onNextClick="onSearchChar($event)"
              @onPreviousClick="onSearchChar($event)"
              @onChangingPage="onSearchChar($event)"
            ></Pagination>
          </v-container>
        </v-col>
      </v-row>
    </div>
    <div v-if="error">
      <v-row justify="start" align="center">
        <v-col cols="auto"> Oups, la recherche effectuée n'a rien donné.</v-col>
        <v-col cols="auto">
          <div class="linked" @click="onSearchChar({}, true)">
            Effectuer une nouvelle recherche
          </div>
        </v-col>
      </v-row>
    </div>
    <Footer />
  </v-container>
</template>

<script lang="ts">
import CharList from "@/components/char/list/CharList.vue";
import Error from "@/components/shared/error/Error.vue";
import Footer from "@/components/shared/footer/Footer.vue";
import Header from "@/components/shared/header/Header.vue";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import SearchBar from "@/components/shared/search-bar/SearchBar.vue";
import { QueryApiModel } from "@/lib/models/api.model";
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  components: {
    CharList,
    SearchBar,
    Pagination,
    Header,
    Footer,
    Error,
  },
  props: {},
  setup(_props, { root }) {
    const data = reactive({
      queryString: {} as QueryApiModel,
      statusList: [
        { key: "Vivant", value: "alive" },
        { key: "Mort", value: "dead" },
        { key: "Inconnu", value: "unknown" },
      ],
      genderList: [
        { key: "Femme", value: "female" },
        { key: "Homme", value: "male" },
        { key: "Sans genre", value: "genderless" },
        { key: "Inconnu", value: "unknown" },
      ],
    });

    function onSearchChar(
      params?: QueryApiModel,
      isNewSearch?: boolean
    ): Promise<void> {
      if (isNewSearch) {
        data.queryString = {} as QueryApiModel;
      }
      return root.$store.dispatch("charStore/searchCharacters", params);
    }

    const charList = computed(() => {
      return root.$store.state.charStore.charList.data;
    });

    const info = computed(() => {
      return root.$store.state.charStore.charList.info;
    });

    const isLoading = computed(() => {
      return root.$store.state.charStore.loading;
    });

    const error = computed(() => {
      return root.$store.state.charStore.error;
    });

    return {
      ...toRefs(data),
      charList,
      isLoading,
      info,
      error,
      onSearchChar,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/style/_colors.scss";

.linked {
  color: $color_prime;
  cursor: pointer;
}
</style>
