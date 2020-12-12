/**
 * Created by mapbar_front on 2019-06-12.
 */
const tableName = 'tableEventName';

const borderColor = '#d2d6de';
const focusBorderColor = '#6392fe';
const activeFontColor = '#6392fe';
const activeBgColor = '#e0e0e0';
const hoverBgColor = '#e0e0e0';
// 表单基本样式定义
export const form = {
  width: '200px',
  height: '40px',
  size: {
    default: '40px',
    medium: '36px',
    small: '32px',
    mini: '28px'
  },
  borderColor,
  focusBorderColor,
  activeFontColor,
  activeBgColor,
  hoverBgColor
};

export default {
  tableName,
  formConfig: form
};
