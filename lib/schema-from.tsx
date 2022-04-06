import { defineComponent, PropType } from "vue";
import { Schema } from "./types";

export default defineComponent({
	props: {
		schema: {
			type: Object as PropType<Schema>,
		},
	},
	name: "SchemaForm",
	setup(props, { slots, emit, attrs }) {
		return () => {
			return <div>this is form</div>;
		};
	},
});
