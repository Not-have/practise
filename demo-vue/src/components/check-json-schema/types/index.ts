import {
  EUiEleType
} from "@/components/enum";

export type TRecord = Record<string | number, unknown>;

export interface IProps<T extends TRecord = TRecord> {
  type: EUiEleType;
  label: string;
  options?: Partial<T>;
}
