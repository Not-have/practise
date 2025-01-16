import Ajv from "ajv";

import JSON_SCHEMA from "../json-schema";
import {
  IProps
} from "../types";

const ajv = new Ajv();

/**
 * checkJsonSchema
 */
export default function check(props: IProps): IProps | undefined {

  const validate = ajv.compile(JSON_SCHEMA);

  if (validate(props)) {
    return props;
  }

  console.error(validate.errors);
}
