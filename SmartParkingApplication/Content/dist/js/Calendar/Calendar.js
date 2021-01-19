$(document).ready(function () {
    LoadDataCalendar();
    checkedDate(1);
    checkedDate(2);
});

function getFormatDatetime(date) {
    var day = new Date(parseInt(date.substr(6)));
    var dd = day.getDate();
    var MM = day.getMonth() + 1;
    var yyyy = day.getFullYear();
    var hh = day.getHours();
    var mm = day.getMinutes();
    var ss = day.getSeconds();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    var result = yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
    return result;
}

//load Data to Working Calendar
function LoadDataCalendar() {
    var ParkingPlaceID = $('#cbparkingPlaceWorkingCalendar').val();
    if (ParkingPlaceID) {
    } else {
        ParkingPlaceID = 1;
    }
    $.ajax({
        url: "/ManageUser/LoadDataCalendar",
        type: "POST",
        data: JSON.stringify({ ParkingPlaceID: ParkingPlaceID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải dữ liệu không thành công!");
            } else {
                let evenArr = [];
                $.each(result, function (key, item) {
                    let evenObj = {
                        id: item.UserScheduleID,
                        title: item.Name,
                        start: getFormatDatetime(item.TimeStart),
                        end: getFormatDatetime(item.TimeEnd)
                    }
                    evenArr.push(evenObj);

                });
                initCalendar(evenArr);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//var IdEditWorkingCalendarD;
function initCalendar(evenArr) {
    var calendar1 = document.getElementById('calendarWork');
    var calendar = new FullCalendar.Calendar(calendar1, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: evenArr,
        eventClick: function (info) {
            ComboboxUserName(2);
            //IdEditWorkingCalendarD = info.event.id;
            $('#IdEditWorkingCalendarD').val(info.event.id);
            $('#FullNameEmp').val("");
            //clearForm();
            $('#myModalEditWorkingCalendar').modal("show");
            LoadDataCalendar();
        }
    });
    calendar.render();
}

//create working calendar
function CreateWorkingCalendar() {
    var res = validateCreateCal();
    if (res == false) {
        return false;
    }
    var UserID = $('#cbUserNameEmp').val();
    var checkboxDate = document.getElementById("checkboxDate");
    if (checkboxDate.checked == false) {
        var scheObj = {
            TimeStart: $('#DateApply').val(),
            TimeEnd: $('#DateApply').val(),
            Slot: $('#cbWorkShiftEmp').val(),
            ParkingPlaceID: $('#cbparkingPlaceEmp').val()
        }
    } else {
        var scheObj = {
            TimeStart: $('#DateStart').val(),
            TimeEnd: $('#DateEnd').val(),
            Slot: $('#cbWorkShiftEmp').val(),
            ParkingPlaceID: $('#cbparkingPlaceEmp').val()
        }
    }
    $.ajax({
        url: "/ManageUser/GetTimeToCreateCalendar",
        type: "POST",
        data: JSON.stringify({ schedule: scheObj, UserID: UserID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "AddFalse") {
                alert("Tạo lịch làm việc không thành công!");
            } else {
                $('#myModalCreateWorkingCalendar').modal('hide');
                LoadDataCalendar();
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function EditWorkingCalendar() {
    var res = validateEditCal();
    if (res == false) {
        return false;
    }
    var id = $('#IdEditWorkingCalendarD').val();
    var userid = $('#cbUserNameEmpEdit').val();
    $.ajax({
        url: "/ManageUser/UpdateWorkingShift",
        type: "POST",
        data: JSON.stringify({ id: id, userid: userid }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "UpdateFalse") {
                alert("Sửa lịch làm việc không thành công!");
            } else {
                $('#myModalEditWorkingCalendar').modal('hide');
                LoadDataCalendar();
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//checkbox show to 
function checkedDate(check) {
    clearBox();
    if (check == 1) {
        if ($('#checkboxDate').is(':checked')) {
            $('#dvDateApply').hide();
            $('#dvDateStart').show();
            $('#dvDateEnd').show();
            $('myModalCreateWorkingCalendar').modal('Show');
        } else {
            $('#dvDateApply').show();
            $('#dvDateStart').hide();
            $('#dvDateEnd').hide();
            $('myModalCreateWorkingCalendar').modal('Show');
        }
    } else {
        if ($('#checkboxDateEdit').is(':checked')) {
            $('#dvDateApplyEdit').hide();
            $('#dvDateStartEdit').show();
            $('#dvDateEndEdit').show();
            $('myModalEditWorkingCalendar').modal('Show');
        } else {
            $('#dvDateApplyEdit').show();
            $('#dvDateStartEdit').hide();
            $('#dvDateEndEdit').hide();
            $('myModalEditWorkingCalendar').modal('Show');
        }
    }
}

//get name staff base on AccountID
function getNameStaff(check) {
    if (check == 1) {
        var id = $('#cbUserNameEmp').val();
    } else {
        var id = $('#cbUserNameEmpEdit').val();
    }
    if (!id) {
        return false;
    }
    $.ajax({
        url: "/ManageUser/GetNameStaff",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                if (check == 1) {
                    $('#FullNameEmp').val(result.Name);
                    $('myModalCreateWorkingCalendar').modal('Show');
                } else {
                    $('#FullNameEmpEdit').val(result.Name);
                    $('myModalEditWorkingCalendar').modal('Show');
                }
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ComboboxUserName(check) {
    var ParkingPlaceID;
    if (check == 1) {
        ParkingPlaceID = $('#cbparkingPlaceEmp').val();
    } else if (check == 2) {
        ParkingPlaceID = $('#cbparkingPlaceWorkingCalendar').val();
    } else {
        ParkingPlaceID = $('#cbparkingPlaceWS').val();
        if (!$('#cbparkingPlaceWS').val()) {
            ParkingPlaceID = 1;
        }
    }
    if (!ParkingPlaceID) {
        return false;
    }
    $.ajax({
        url: "/ManageUser/ComboboxUserName",
        type: "POST",
        data: JSON.stringify({ ParkingPlaceID: ParkingPlaceID, check: check }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<option value="' + item.UserID + '">' + item.UserName + '</option>';
                });
                if (check == 1) {
                    $("#cbUserNameEmp").html(html);
                    $('#cbUserNameEmp').val(null).trigger('change');
                    $("#cbUserNameEmp").select2({
                        placeholder: "Chọn tên tài khoản",
                        allowClear: true
                    });
                } else if (check == 2) {
                    $("#cbUserNameEmpEdit").html(html);
                    $('#cbUserNameEmpEdit').val(null).trigger('change');
                    $("#cbUserNameEmpEdit").select2({
                        placeholder: "Chọn tên tài khoản",
                        allowClear: true
                    });
                } else {
                    $('#cbUserNameWS').html(html);
                    $('#cbUserNameWS').val(null).trigger('change');
                    $("#cbUserNameWS").select2({
                        placeholder: "Chọn tên tài khoản",
                        allowClear: true
                    });
                }
            }
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function clearBox(check) {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    if (check == 1) {
        $('#cbUserNameEmp').val("");
        $('#FullNameEmp').val("");
        $('#DateApply').val("");
        $('#DateStart').val("");
        $('#DateEnd').val("");
    } else {
        $('#cbUserNameEmpEdit').val("");
        $('#FullNameEmpEdit').val("");
        $('#DateApplyEdit').val("");
        $('#DateStartEdit').val("");
        $('#DateEndEdit').val("");
    }
}

//validate using jquery
function validateCreateCal() {
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set custom valid by rule
    $.validator.addMethod('checkDateApp', function (value, element) {
        return new Date(value) > new Date();
    });
    $.validator.addMethod('checkDateStart', function (value, element) {
        return new Date(value) > new Date() && new Date(value) < new Date($('#DateEnd').val());
    });
    $.validator.addMethod('checkDateEnd', function (value, element) {
        return new Date(value) > new Date() && new Date(value) > new Date($('#DateStart').val());
    });
    //Set rule + message for input by name
    $('#FormAddWC').validate({
        rules: {
            cbUserNameEmp: {
                required: true
            },
            DateApply: {
                required: true,
                checkDateApp: true
            },
            DateStart: {
                required: true,
                checkDateStart: true
            },
            DateEnd: {
                required: true,
                checkDateEnd: true
            }
        },
        messages: {
            cbUserNameEmp: {
                required: '*Bắt buộc.'
            },
            DateApply: {
                required: '*Bắt buộc.',
                checkDateApp: 'Lịch phải lớn hơn hiện tại!'
            },
            DateStart: {
                required: '*Bắt buộc.',
                checkDateStart: 'Phải lớn hơn hiện tại và nhỏ hơn thời gian kết thúc!'
            },
            DateEnd: {
                required: '*Bắt buộc.',
                checkDateEnd: 'Phải lớn hơn hiện tại và lớn hơn thời gian bắt đầu!'
            }
        }
    });
    return $('#FormAddWC').valid();
}

function validateEditCal() {
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set rule + message for input by name
    $('#FormEditWC').validate({
        rules: {
            cbUserNameEmpEdit: {
                required: true
            }
        },
        messages: {
            cbUserNameEmpEdit: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormEditWC').valid();
}