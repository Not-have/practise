import {
  VNode
} from "vue";

export interface IProps {
  type: string;
  label: string | VNode;
  options: { [key: string]: unknown };
}
