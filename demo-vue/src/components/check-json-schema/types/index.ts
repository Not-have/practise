import {
  EUiEleType
} from "@/components/enum";

export type TRecord = Record<string | number, unknown>;

export interface IProps {
  type: EUiEleType;
  label: string;

  // options?: object;
}
