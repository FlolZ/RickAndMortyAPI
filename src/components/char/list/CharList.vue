<template>
  <div v-if="charList">
    <v-row justify="space-around">
      <v-col class="col-10 col-md-3" v-for="char in charList" :key="char.id">
        <CharCard
          :char="char"
          :loading="loading"
          @onCardClick="onCardClick(char.id)"
        >
          {{ char }}
        </CharCard>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import CharCard from "@/components/char/shared/card/CharCard.vue";
import { CharModel } from "@/lib/models/char/char.model";
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

interface CharListPropOptions {
  charList: CharModel[];
  loading: boolean;
}
export default defineComponent<CharListPropOptions>({
  components: {
    CharCard,
  },
  props: {
    charList: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { root }) {
    const data = reactive({});

    function onCardClick(id: number): void {
      navigateToContultChar(id);
    }

    function navigateToContultChar(id: number): void {
      root.$router.push({
        name: "characters-consult",
        params: { charId: String(id) },
      });
    }

    return {
      ...toRefs(data),
      onCardClick,
    };
  },
});
</script>

<style scoped lang="scss"></style>
