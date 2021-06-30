<template>
  <v-row>
    <v-col>
      <div class="footer">
        <div class="copyright">
          © 2021 Rick And Morty
          <a href="https://fr.linkedin.com/in/horrut-florian-37897a5a"
            >Florian Horrut</a
          >
        </div>
      </div>
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
@import "@/style/_colors.scss";

.footer {
  height: 200px;
  color: $color_black;
  .copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    a {
      margin-left: 5px;
    }
  }
}
</style>
