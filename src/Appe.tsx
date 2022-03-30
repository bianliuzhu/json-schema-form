import { defineComponent, ref, watchEffect } from "vue";
import LOGO from "./assets/logo.png";
import HelloWorldVue from "./components/HelloWorld.vue";

export default defineComponent({
  setup() {
    const state = ref(10);
    watchEffect(() => {
      console.log(state.value);
    });
    return () => (
      <div>
        <img src={LOGO} alt="" />
        <input type="text" v-model={state.value} />
        <HelloWorldVue msg="Hello Vue 3 + TypeScript + Vite"></HelloWorldVue>
      </div>
    );
  },
});
