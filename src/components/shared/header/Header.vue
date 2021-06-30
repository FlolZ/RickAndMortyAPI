<template>
  <v-row justify="center" class="header mb5">
    <v-col cols="6">
      <img src="@/assets/header.png" alt="logo" class="logo" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

export default defineComponent({
  props: {},
  setup() {
    const data = reactive({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
}
</style>
