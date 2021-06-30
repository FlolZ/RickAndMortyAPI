<template>
  <div class="error-container">
    <img src="@/assets/404.png" alt="" />
    <div class="error-message">
      Houla malheureux !<br />
      Le personnage que tu recherches n'existe pas mais tu peux retourner à la
      liste effectuer une nouvelle recherche ! <br />
      <v-btn color="primary" @click="onBackClick()"> Retour à la liste</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

interface CharConsultPropOptions {
  errorMsg: string;
}

export default defineComponent<CharConsultPropOptions>({
  props: {
    char: {
      type: String,
      required: false,
    },
  },
  setup(_pros, { root }) {
    const data = reactive({});

    function onBackClick(): void {
      root.$router.push({
        name: "home",
      });
    }

    return {
      ...toRefs(data),
      onBackClick,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/style/_colors.scss";
.error-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  & img {
    width: 100%;
  }
}

.error-message {
  position: absolute;
  top: 77%;
  left: 71%;
  transform: translate(-40%, -40%);
  font-size: 35px;
  color: $color_white;
  background: transparent;
}
</style>
