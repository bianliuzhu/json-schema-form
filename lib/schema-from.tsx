import { defineComponent } from "vue";

export default defineComponent({
	name: "SchemaForm",
	setup(props, { slots, emit, attrs }) {
		return () => {
			return <div>this is form</div>;
		};
	},
});
