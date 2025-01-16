import Ajv from "ajv/dist/jtd";

import JSON_SCHEMA from "../json-schema";
import {
  IProps
} from "../types";

const ajv = new Ajv();

const validate = ajv.compile(JSON_SCHEMA);

export default function check(props: IProps): IProps | undefined {
  if (validate(props)) {
    return props;
  }

  console.error(validate.errors);
}
