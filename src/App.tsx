import { defineComponent, reactive, ref, Ref, watchEffect } from "vue";
import { createUseStyles } from "vue-jss";
import MonacoEditor from "./components/monaco-editor";
import demos from "./demos";
import SchemaForm from "../lib";

// TODO: 在lib张export
type Schema = any;
type UISchema = any;

const schema = {
	type: "string",
};

const toJson = (schema: any) => {
	return JSON.stringify(schema, null, 2);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "1200px",
		margin: "0 auto",
	},
	menu: {
		marginBottom: 20,
	},
	code: {
		width: 700,
		flexShrink: 0,
	},
	codePanel: {
		minHeight: 400,
		marginBottom: 20,
	},
	uiAndValue: {
		display: "flex",
		justifyContent: "space-between",
		// uiAndValue 内部所有的样式都是一样
		"& > *": {
			width: "46%",
		},
	},
	content: {
		display: "flex",
	},
	form: {
		padding: "0 20px",
		flexGrow: 1,
	},
	menuButton: {
		appearance: "none",
		borderWidth: 0,
		backgroundColor: "transparent",
		cursor: "pointer",
		display: "inline-block",
		padding: 15,
		borderRadius: 5,
		// .menuButton:hover
		"&:hover": {
			background: "#efefef",
		},
	},
	menuSelected: {
		background: "#337ab7",
		color: "#fff",
		"&:hover": {
			background: "#337ab7",
		},
	},
});

export default defineComponent({
	setup() {
		const schemaRef: Ref<any> = ref(schema);

		const selectdRef: Ref<number> = ref(0);
		const demo: {
			schema: Schema | null;
			data: any;
			uiSchema: UISchema | null;
			schemaCode: string;
			dataCode: string;
			uiSchemaCode: string;
		} = reactive({
			schema: null,
			data: {},
			uiSchema: {},
			schemaCode: "",
			dataCode: "",
			uiSchemaCode: "",
		});
		watchEffect(() => {
			const index = selectdRef.value;
			const d = demos[index];
			demo.schema = d.schema;
			demo.data = d.default;
			demo.uiSchema = d.uiSchema;
			demo.schemaCode = toJson(d.schema);
			demo.dataCode = toJson(d.default);
			demo.uiSchemaCode = toJson(d.uiSchema);
		});

		const methodRef: Ref<any> = ref();

		const classRef = useStyles();

		const handleChange = (v: any) => {
			demo.data = v;
			demo.dataCode = toJson(v);
		};

		const handleCodeChange = (
			filed: "schema" | "data" | "uiSchema",
			value: string,
		) => {
			let schema: any;
			try {
				const json = JSON.parse(value);
				demo[filed] = json;
				(demo as any)[`${filed}Code`] = value;
			} catch (err) {}
			schemaRef.value = schema;
		};
		const handleSchemaChange = (v: string) => handleCodeChange("schema", v);
		const handleDataChange = (v: string) => handleCodeChange("data", v);
		const handleUiSchemaChange = (v: string) => handleCodeChange("uiSchema", v);
		return () => {
			const classes = classRef.value;
			const selected = selectdRef.value;
			const code = toJson(schemaRef.value);

			return (
				<div class={classes.container}>
					<div class={classes.menu}>
						<h1>Vue3 JsonSchema Form</h1>
						<div>
							{demos.map((demo, index) => (
								<button
									class={{
										[classes.menuButton]: true,
										[classes.menuSelected]: index === selected,
									}}
									onClick={() => (selectdRef.value = index)}
								>
									{demo.name}
								</button>
							))}
						</div>
					</div>
					<div class={classes.content}>
						<div class={classes.code}>
							<MonacoEditor
								code={demo.schemaCode}
								title="Schema"
								class={classes.codePanel}
								onChange={handleSchemaChange}
							/>
							<div class={classes.uiAndValue}>
								<MonacoEditor
									code={demo.uiSchemaCode}
									class={classes.codePanel}
									onChange={handleUiSchemaChange}
									title="UI Schema"
								/>
								<MonacoEditor
									code={demo.dataCode}
									class={classes.codePanel}
									onChange={handleDataChange}
									title="Value"
								/>
							</div>
						</div>
						<div class={classes.form}>
							<SchemaForm></SchemaForm>
						</div>
					</div>
				</div>
			);
		};
	},
});
