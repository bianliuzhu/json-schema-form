const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const localize = require("ajv-i18n");
const ajv = new Ajv(); // options can be passed, e.g. {}

addFormats(ajv);
const schema = {
  type: "object",
  additionalProperties: false, // 额外属性
  required: ["name", "age"],
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 6,
    },
    age: {
      type: "number",
    },
    pets: {
      type: "array",
    },
    isWorks: {
      type: "boolean",
    },
    email: {
      type: "string",
      format: "email",
    },
    Gleason: {
      range: true,
    },
  },
};
// ajv.addFormat("test", (data) => {
//   console.log("------->", data);
//   return data === "haha";
// });

/// function 方式
// ajv.addKeyword("range", {
//   validate(schema, data) {
//     if (Array.isArray(data)) return schema;
//     return false;
//   },
// });

ajv.addKeyword("range", {
  compile(schema, parentSchema) {
    console.log(schema, parentSchema);
    return () => true;
  },
});
const validate = ajv.compile(schema);

const data = {
  name: "12341",
  age: "23243",
  isWorks: true,
  pets: ["dog", 123],
  email: "bianliuzhu@gmail.com",
  Gleason: [1, 1],
};

const valid = validate(data);
if (valid) {
  console.log("验证通过");
} else {
  localize.zh(validate.errors);
  console.log(validate.errors);
}
