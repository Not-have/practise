import {
  EUiEleType
} from "@/components/enum";
import {
  JTDSchemaType
} from "ajv/dist/jtd";

import {
  IProps
} from "../types";

const JSON_SCHEMA: JTDSchemaType<IProps> = {
  properties: {
    type: {
      enum: Object.values(EUiEleType)
    },
    label: {
      type: "string"
    }
  },
  optionalProperties: {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options: {
      type: "any"
    }
  }
};

export default JSON_SCHEMA;
