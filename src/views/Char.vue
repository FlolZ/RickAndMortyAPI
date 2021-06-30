<template>
  <div>
    <CharConsult
      v-if="showChard"
      :char="char"
      :location="location"
      :episode-list="episodeList"
    ></CharConsult>
    <Error v-if="error"></Error>
  </div>
</template>

<script lang="ts">
import CharConsult from "@/components/char/consult/CharConsult.vue";
import Error from "@/components/shared/error/Error.vue";
import { extractNumberFromUrl } from "@/helper/number.helper";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  components: {
    CharConsult,
    Error,
  },
  props: {},
  setup(_props, { root }) {
    const data = reactive({});

    onMounted(() => {
      const params = root.$route.params.charId;
      root.$store.dispatch("charStore/getCharacter", params);
    });

    const char = computed(() => {
      return root.$store.state.charStore.char;
    });

    watch(
      () => char.value,
      () => {
        loadCharLocation();
        loadEpisodeList();
      }
    );

    function loadEpisodeList(): void {
      const params = char.value.episode.map((episodeUrl: string) =>
        extractNumberFromUrl(episodeUrl)
      );
      root.$store.dispatch("episodeStore/getMultipleEpisode", params);
    }

    function loadCharLocation(): void {
      root.$store.dispatch(
        "locationStore/getLocation",
        char.value.location.url
      );
    }

    const location = computed(() => {
      return root.$store.state.locationStore.location;
    });

    const episodeList = computed(() => {
      return root.$store.state.episodeStore.episodeList;
    });

    const error = computed(() => {
      return (
        root.$store.state.charStore.error ||
        root.$store.state.locationStore.error ||
        root.$store.state.episodeStore.error
      );
    });

    const showChard = computed(() => {
      return (
        episodeList.value &&
        location.value &&
        location.value.id &&
        char.value &&
        char.value.id &&
        !error.value
      );
    });

    return {
      ...toRefs(data),
      char,
      error,
      showChard,
      location,
      episodeList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
