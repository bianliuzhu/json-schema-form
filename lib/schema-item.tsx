import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes } from "./types";
import StringFields from "./fields/string-fields";
import NumberField from "./fields/number-field";
export default defineComponent({
	name: "SchemaItem",
	props: {
		schema: {
			type: Object as PropType<Schema>,
			required: true,
		},
		value: {
			required: true,
		},
		onChange: {
			type: Function as PropType<(v: any) => void>,
			required: true,
		},
	},
	setup(props) {
		return () => {
			const { schema } = props;

			const type = schema?.type;
			let Component: any;
			switch (type) {
				case SchemaTypes.STRING: {
					Component = StringFields;
					break;
				}
				case SchemaTypes.NUMBER: {
					Component = NumberField;
					break;
				}
				default: {
					console.warn(`${type} is not supported`);
				}
			}
			return <Component {...props} />;
		};
	},
});
