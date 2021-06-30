<template>
  <v-col>
    <v-row dense>
      <v-col>
        <h3>
          <v-icon :color="iconColor" size="35" class="mr-2">{{ icon }}</v-icon>
          {{ infoType }}
        </h3>
      </v-col>
    </v-row>
    <v-row dense class="ml-11">
      <v-col>
        <div>{{ info }}</div>
      </v-col>
      <v-col> <slot></slot></v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

interface CharRowInfoPropOptions {
  infoType: string;
  info: string;
  icon: string;
  iconColor: string;
}

export default defineComponent<CharRowInfoPropOptions>({
  props: {
    infoType: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      required: false,
    },
  },
  setup(_props) {
    const data = reactive({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss"></style>
