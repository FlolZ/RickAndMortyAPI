<template>
  <div>
    <v-row align="center" dense>
      <v-col>
        <v-text-field
          v-model="query.name"
          @keypress.enter="onSearchClick()"
          placeholder="Rechercher un nom de personnage"
        ></v-text-field>
      </v-col>

      <v-col cols="auto">
        <v-btn color="primary" @click="onSearchClick()"> Rechercher </v-btn>
      </v-col>

      <v-col cols="auto" v-if="hasSlot">
        <div>
          <div
            class="expand-icon-container"
            v-ripple="{ class: `primary--text` }"
          >
            <v-icon
              rounded
              @click="isExpanded = !isExpanded"
              class="clickable"
              color="primary"
              size="20"
              >{{ !isExpanded ? "mdi-plus-circle" : "mdi-minus-circle" }}
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <div v-show="isExpanded">
      <slot :query="query"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { QueryApiModel } from "@/lib/models/api.model";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/composition-api";

interface SearchBarPropOptions {
  query: QueryApiModel;
}
export default defineComponent<SearchBarPropOptions>({
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit, root, slots }) {
    const data = reactive({
      isExpanded: false,
    });

    onMounted(() => {
      onSearchClick();
    });

    function onSearchClick(): void {
      props.query.page = 1;
      emit("onSearchClick", props.query);
    }

    const hasSlot = computed(() => {
      return !!slots["default"];
    });

    return {
      ...toRefs(data),
      onSearchClick,
      hasSlot,
    };
  },
});
</script>

<style scoped lang="scss"></style>
