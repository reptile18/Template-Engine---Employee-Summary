
function checkEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  else {
    return "Please enter a valid email address";
  }
  
}

function checkPhone(phone) {
  if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
    return true;
  }
  else {
    return "Please enter a valid phone number"
  }
}

module.exports = {
  checkEmail,
  checkPhone
}