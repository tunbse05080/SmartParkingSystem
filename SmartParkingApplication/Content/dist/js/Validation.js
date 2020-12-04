//Valdidation using jquery
function validate() {
    var isValid = true;
    var rfidCard = new RegExp('^[0-9]{10,}$');
    var email = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    var pwd = new RegExp('(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    var idcard = new RegExp('^[0-9]{9,}$');
    var phone = new RegExp('^(09|03|07|08|05){1}([0-9]{8})$');
    if ($.trim($('#UserName').val()) == "" || $.trim($('#UserName').val()).length < 4) {
        $('#UserName').prop("title", "Tên tài khoản > 4 ký tự.");
        $('#UserName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserName').prop("title", "");
        $('#UserName').css('border-color', 'lightgrey');
    }
    if ($.trim($('#PassWord').val()) == "" || !pwd.test($.trim($('#PassWord').val()))) {
        $('#PassWord').prop("title", "Mật khấu >= 6 ký tự (chữ hoa, thường, số, ký tự đặc biệt.)");
        $('#PassWord').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PassWord').prop("title", "");
        $('#PassWord').css('border-color', 'lightgrey');
    }
    if ($.trim($('#FullName').val()) == "" || $.trim($('#FullName').val()).length < 4) {
        $('#FullName').prop("title", "Tên đầy đủ > 4 ký tự.");
        $('#FullName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FullName').prop("title", "");
        $('#FullName').css('border-color', 'lightgrey');
    }
    if ($.trim($('#DateOfBirth').val()) == "") {
        $('#DateOfBirth').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateOfBirth').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Gender').val()) == "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Address').val()) == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($.trim($('#PhoneNumber').val()) == "" || !phone.test($.trim($('#PhoneNumber').val()))) {
        $('#PhoneNumber').prop("title", "Số điện thoại trống hoặc định dạng sai.");
        $('#PhoneNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PhoneNumber').prop("title", "");
        $('#PhoneNumber').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Email').val()) == "" || !email.test($.trim($('#Email').val()))) {
        $('#Email').prop("title", "Email trống hoặc không đúng định dạng.");
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').prop("title", "");
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($.trim($('#IdentityCard').val()) == "" || !idcard.test($.trim($('#IdentityCard').val()))) {
        $('#IdentityCard').prop("title", "CMND/CCCD trống hoặc sai định dạng.");
        $('#IdentityCard').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdentityCard').prop("title", "")
        $('#IdentityCard').css('border-color', 'lightgrey');
    }
    if ($.trim($('#ParkingPlace').val()) == "") {
        $('#ParkingPlace').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ParkingPlace').css('border-color', 'lightgrey');
    }
    if ($.trim($('#RoleName').val()) == "") {
        $('#RoleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoleName').css('border-color', 'lightgrey');
    }
    if ($.trim($('#CardNumber').val()) == "" || !rfidCard.test($.trim($('#CardNumber').val()))) {
        $('#CardNumber').prop("title", "Số thẻ trống hoặc sai định dạng(>9 số).");
        $('#CardNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CardNumber').prop("title", "");
        $('#CardNumber').css('border-color', 'lightgrey');
    }
    return isValid;
}