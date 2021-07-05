<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    @click="onCardClick"
  >
    <template slot="progress">
      <v-progress-linear
        color="primary"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="char.image"></v-img>

    <v-card-title><span>{{ char.name }}</span></v-card-title>

    <v-card-text>
      <div class="text-subtitle-1">
        {{ char.species }} - {{ char.gender }} - {{ char.status }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text v-if="!short">
      <div class="text--primary my-2">
        <v-icon class="mr-2">mdi-earth</v-icon> {{ char.origin.name }}
      </div>
      <div class="text--primary my-2">
        <v-icon class="mr-2">mdi-google-maps</v-icon>
        {{ char.location.name }}
      </div>
      <div class="text--primary my-2">
        <v-icon class="mr-2">mdi-television</v-icon> Nombre d'épisode(s) (
        {{ char.episode.length }} )
      </div>
      <div class="text--primary my-2">
        <v-icon class="mr-2">mdi-calendar-range</v-icon>
        {{ formatDate(char.created) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { CharModel } from "@/lib/models/char/char.model";
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

interface CharCardPropOptions {
  char: CharModel;
  loading: boolean;
  short: boolean;
}
export default defineComponent<CharCardPropOptions>({
  props: {
    char: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    short: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(_props, { emit }) {
    const data = reactive({});

    function onCardClick(): void {
      emit("onCardClick");
    }

    function formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString("fr-FR");
    }

    return {
      ...toRefs(data),
      onCardClick,
      formatDate,
    };
  },
});
</script>

<style scoped lang="scss"></style>
