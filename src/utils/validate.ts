/**
 * 手机验证
 * @param {*} phone 
 */
export function validatePhone(phone:string) {
  // var isMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
  var isPhone = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9])|(16[6]))\d{8}$/;
  if (!isPhone.test(phone)) {
    return false;
  }
  return true;
}


