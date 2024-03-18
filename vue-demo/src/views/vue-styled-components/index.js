import styled from 'vue-styled-components';
import { ElButton } from 'element-plus';

const ScElButton = styled(ElButton).attrs({ as: 'button' })`
  /* 添加您需要的样式属性 */
  color: red; /* 修改按钮文字颜色为红色 */
  font-size: 1em; /* 设置按钮文字大小 */
  text-decoration: none; /* 移除按钮文字的下划线 */
`;

export default {
  components: {
    ScElButton
  }
}
