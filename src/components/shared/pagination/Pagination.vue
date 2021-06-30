<template>
  <v-pagination
    v-model="currentPage"
    :length="info.pages"
    circle
    @next="onNextClick()"
    @prev="onPreviousClick()"
  ></v-pagination>
</template>

<script lang="ts">
import { extractNumberFromUrl } from "@/helper/number.helper";
import { QueryApiModel } from "@/lib/models/api.model";
import { InfoModel } from "@/lib/models/info/info.model";
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";

interface PaginationPropOptions {
  info: InfoModel;
  query: QueryApiModel;
}

export default defineComponent<PaginationPropOptions>({
  props: {
    info: {
      type: Object,
      required: true,
    },
    query: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      currentPage: getCurrentPage(),
    });

    function getCurrentPage(): number {
      const currentPrevPageNumber = extractNumberFromUrl(props.info.prev);
      return currentPrevPageNumber ? currentPrevPageNumber + 1 : 1;
    }

    function onNextClick(): void {
      const nextPageNumber = extractNumberFromUrl(props.info.next);
      if (nextPageNumber) {
        props.query.page = nextPageNumber;
      }
      emit("onNextClick", props.query);
    }

    function onPreviousClick(): void {
      const previousPageNumber = extractNumberFromUrl(props.info.prev);
      if (previousPageNumber) {
        props.query.page = previousPageNumber;
      }
      emit("onPreviousClick", props.query);
    }

    function onChangingPage(): void {
      props.query.page = data.currentPage;
      emit("onChangingPage", props.query);
    }

    watch(
      () => data.currentPage,
      () => {
        onChangingPage();
      }
    );

    watch(
      () => props.info,
      () => {
        data.currentPage = getCurrentPage();
      }
    );

    return {
      ...toRefs(data),
      onNextClick,
      onPreviousClick,
    };
  },
});
</script>

<style scoped lang="scss"></style>
