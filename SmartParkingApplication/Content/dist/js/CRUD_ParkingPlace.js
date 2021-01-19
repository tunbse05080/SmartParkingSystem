
//load page
$(document).ready(function () {
    loadDataParkingPlace();
});

function loadDataParkingPlace() {
    $.ajax({
        url: "/ManagePPlace/loadDataParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải dữ liệu không thành công!");
            } else {
                var data = result.datapp;
                var html = '';
                var totalPlace = '';
                $.each(data, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.NameOfParking + '</td>';
                    html += '<td>' + item.Location + '</td>';
                    html += '<td>' + item.NumberOfCar + '</td>';
                    html += '<td>' + item.NumberCarBlank + '</td>';
                    html += '<td>' + item.NumberOfMotoBike + '</td>';
                    html += '<td>' + item.NumberMotoBikeBlank + '</td>';
                    html += '<td>' + item.StatusOfParkingPlace + '</td>';

                    switch (item.StatusOfParkingPlace) {
                        case "Dừng hoạt động":
                            html += '<td><button class="btn btn-primary" style="width:109px" onclick = "return getPPDetailByID(' + item.ParkingPlaceID + ')"> Chi tiết</button><button class="btn btn-warning" style="width:150px" onclick="return getUnLockParkingByID(' + item.ParkingPlaceID + ')" >Mở Hoạt Động</button></td>';
                            break;
                        case "Đang hoạt động":
                            html += '<td><button class="btn btn-primary" style="width:109px" onclick = "return getPPDetailByID(' + item.ParkingPlaceID + ')"> Chi tiết</button><button class="btn btn-success" style="width:109px" onclick="return getPPByID(' + item.ParkingPlaceID + ')" > Sửa</button><button class="btn btn-danger" style="width:218px" onclick="return getLockParkingByID(' + item.ParkingPlaceID + ')" > Tạm Dừng Hoạt Động</button></td>';
                            break;

                    }

                    html += '</tr>';
                });
                $('#tbodypp').html(html);
                $('#tbPPlace').DataTable({
                    "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tbPPlace_wrapper .col-md-6:eq(0)');
                totalPlace += '<h3>' + result.total + '<sup style="font-size: 20px"></sup></h3>';
                totalPlace += '<p>Tổng Số Bãi Đỗ</p>';
                $('#totalParkingPlace').html(totalPlace);
            }

        },
        error: function () {
            
        }
    });


}

var checkExistNameParkingUpdate;
function UpdatePP() {
    var res = validateUpdatePP();
    if (res == false) {
        return false;
    }
    checkExistNameParkingUpdate = true;
    var empPPObj = {
        ParkingPlaceID: $('#ParkingPlaceIDEdit').val(),
        NameOfParking: $('#NameOfParkingEdit').val(),
        Location: $('#LocationEdit').val(),
        NumberOfCar: $('#NumberOfCarEdit').val(),
        NumberOfMotoBike: $('#NumberOfMotoBikeEdit').val(),
        NumberCarBlank: $('#NumberCarBlankEdit').val(),
        NumberMotoBikeBlank: $('#NumberMotoBikeBlankEdit').val(),
        StatusOfParkingPlace: $('#StatusParkingPlaceEdit').val(),
    };
    $.ajax({
        url: "/ManagePPlace/CheckNameParkingExistToUpdate",
        data: JSON.stringify(empPPObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "UpdateFalse") {
                alert("Cập nhật bãi đỗ không thành công!");
            } else {
                if (result == true) {
                    validateUpdatePP();
                    checkExistNameParkingUpdate = false;
                    return false;
                } else {
                    checkExistNameParkingUpdate = false;
                    $('#tbPPlace').DataTable().clear().destroy();
                    loadDataParkingPlace();
                    $('#myModalUpdatePP').modal('hide');
                }
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function getPPByID(ParkingPlaceID) {
    clearTextBoxPP();
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#ParkingPlaceIDEdit').val(result.ParkingPlaceID);
                $('#NameOfParkingEdit').val(result.NameOfParking);
                $('#LocationEdit').val(result.Location);
                $('#NumberOfCarEdit').val(result.NumberOfCar);
                $('#NumberOfMotoBikeEdit').val(result.NumberOfMotoBike);
                $('#NumberCarBlankEdit').val(result.NumberCarBlank);
                $('#NumberMotoBikeBlankEdit').val(result.NumberMotoBikeBlank);
                $('#StatusParkingPlaceEdit').val(result.StatusOfParkingPlace);
                $('#myModalUpdatePP').modal('show');
            }
        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}

function getPPDetailByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#ParkingPlaceIDd').val(result.ParkingPlaceID);
                $('#NameOfParkingd').val(result.NameOfParking);
                $('#Locationd').val(result.Location);
                $('#NumberOfCardd').val(result.NumberOfCar);
                $('#NumberOfMotoBiked').val(result.NumberOfMotoBike);
                $('#NumberCarBlankd').val(result.NumberCarBlank);
                $('#NumberMotoBikeBlankd').val(result.NumberMotoBikeBlank);
                $('#StatusOfParkingPlaced').val(result.statusOfParking);
                $('#myModalDetailPP').modal('show');
            }
        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}

var checkExistNameParking;
function AddPP() {
    var res = validateAddPP();
    if (res == false) {
        return false;
    }
    checkExistNameParking = true;
    var empPPObj = {
        NameOfParking: $('#NameOfParking').val(),
        Location: $('#Location').val(),
        NumberOfCar: $('#NumberOfCar').val(),
        NumberOfMotoBike: $('#NumberOfMotoBike').val(),
        NumberCarBlank: $('#NumberOfCar').val(),
        NumberMotoBikeBlank: $('#NumberOfMotoBike').val(),
        StatusOfParkingPlace: 1,
    };
    $.ajax({
        url: "/ManagePPlace/CheckNameParkingExistToAdd",
        data: JSON.stringify(empPPObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "AddFalse") {
                alert("Thêm bãi đỗ không thành công!");
            } else {
                if (result == true) {
                    validateAddPP();
                    checkExistNameParking = false;
                    return false;
                } else {
                    checkExistNameParking = false;
                    $('#tbPPlace').DataTable().clear().destroy();
                    loadDataParkingPlace();
                    $('#myModalPP').modal('hide');
                }
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function clearTextBoxPP() {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    ComboboxStatusOfParking();
    $('#Id').val("");
    $('#NameOfParking').val("");
    $('#Location').val("");
    $('#NumberOfCar').val("");
    $('#NumberOfMotoBike').val("");
    $('#NumberCarBlank').val("");
    $('#NumberMotoBikeBlank').val("");
    $('#StatusOfParking').val("");
}

//validate using Jquery
function validateAddPP() {
    var numberSlot = new RegExp('^[0-9]{2,}$');
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
    $.validator.addMethod('checkSlotCar', function (value, element) {
        return numberSlot.test(value) && value > 99;
    });
    $.validator.addMethod('checkSlotMotorBike', function (value, element) {
        return numberSlot.test(value) && value > 199;
    });
    $.validator.addMethod('checkPPAddress', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkPPName', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkPPNameExist', function (value, element) {
        return checkExistNameParking != true;
    },'Tên bãi đỗ đã tồn tại');
    //Set rule + message for input by name
    $('#FormAddPP').validate({
        rules: {
            NameOfParking: {
                required: true,
                checkPPName: true,
                checkPPNameExist: true
            },
            Location: {
                required: true,
                checkPPAddress: true
            },
            NumberOfCar: {
                required: true,
                checkSlotCar: true
            },
            NumberOfMotoBike: {
                required: true,
                checkSlotMotorBike: true
            }
        },
        messages: {
            NameOfParking: {
                required: '*Bắt buộc.',
                checkPPName: 'Tên bãi có ít nhất 5 kí tự!'
            },
            Location: {
                required: '*Bắt buộc.',
                checkPPAddress: 'Địa chỉ có ít nhất 5 kí tự!'
            },
            NumberOfCar: {
                required: '*Bắt buộc.',
                checkSlotCar: 'Sức chứa là số ít nhất 100 chỗ'
            },
            NumberOfMotoBike: {
                required: '*Bắt buộc.',
                checkSlotMotorBike: 'Sức chứa là số ít nhất 200 chỗ'
            }
        }
    });
    return $('#FormAddPP').valid();
}

function validateUpdatePP() {
    var numberSlot = new RegExp('^[0-9]{2,}$');
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
    $.validator.addMethod('checkBlankCar', function (value, element) {
        return numberSlot.test(value) && value <= (+$('#NumberOfCarEdit').val());
    });
    $.validator.addMethod('checkBlankMoterBike', function (value, element) {
        return numberSlot.test(value) && value <= (+$('#NumberOfMotoBikeEdit').val());
    });
    $.validator.addMethod('checkSlotCar', function (value, element) {
        return numberSlot.test(value) && value > 99;
    });
    $.validator.addMethod('checkSlotMotorBike', function (value, element) {
        return numberSlot.test(value) && value > 199;
    });
    $.validator.addMethod('checkPPAddress', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkPPName', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkPPNameUpdateExist', function (value, element) {
        return checkExistNameParkingUpdate != true;
    },'Tên bãi đỗ đã tồn tại.');
    ////$.validator.addMethod('checkPPNameExist', function (value, element) {
    ////    return checkExistNameParking != true;
    ////});
    //Set rule + message for input by name
    $('#FormEditPP').validate({
        rules: {
            NameOfParkingEdit: {
                required: true,
                checkPPName: true,
                checkPPNameUpdateExist: true
            },
            LocationEdit: {
                required: true,
                checkPPAddress: true
            },
            NumberOfCarEdit: {
                required: true,
                checkSlotCar: true
            },
            NumberOfMotoBikeEdit: {
                required: true,
                checkSlotMotorBike: true
            },
            NumberCarBlankEdit: {
                required: true,
                checkBlankCar: true
            },
            NumberMotoBikeBlankEdit: {
                required: true,
                checkBlankMoterBike: true
            }
        },
        messages: {
            NameOfParkingEdit: {
                required: '*Bắt buộc.',
                checkPPName: 'Tên bãi có ít nhất 5 kí tự!'
            },
            LocationEdit: {
                required: '*Bắt buộc.',
                checkPPAddress: 'Địa chỉ có ít nhất 5 kí tự!'
            },
            NumberOfCarEdit: {
                required: '*Bắt buộc.',
                checkSlotCar: 'Sức chứa là số ít nhất 100 chỗ'
            },
            NumberOfMotoBikeEdit: {
                required: '*Bắt buộc.',
                checkSlotMotorBike: 'Sức chứa là số ít nhất 200 chỗ'
            },
            NumberCarBlankEdit: {
                required: '*Bắt buộc.',
                checkBlankCar: 'Chỗ trống là số không lớn hơn sức chứa!'
            },
            NumberMotoBikeBlankEdit: {
                required: '*Bắt buộc.',
                checkBlankMoterBike: 'Chỗ trống là số không lớn hơn sức chứa!'
            }
        }
    });
    return $('#FormEditPP').valid();
}
//comboboxStatusOfParking
function ComboboxStatusOfParking() {
    $.ajax({
        url: "/ManagePPlace/ComboboxStatusOfParking",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải combobox tình trạng bãi đỗ không thành công!");
            } else {
                var html = '';
                var i = 0;
                $.each(result, function (key, item) {
                    html += '<option value="' + i + '">' + item + '</option>';
                    i++;
                });
                $("#cbStatusOfParking").html(html);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getLockParkingByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#ParkingPlaceIDlock').val(result.ParkingPlaceID);
                $('#NameOfParkinglock').val(result.NameOfParking);
                $('#NumberOfMotoBikelock').val(result.NumberOfMotoBike);
                $('#Locationlock').val(result.Location);
                $('#NumberOfCarlock').val(result.NumberOfCar);

                $('#NumberCarBlanklock').val(result.NumberCarBlank);
                $('#NumberMotoBikeBlanklock').val(result.NumberMotoBikeBlank);
                $('#StatusOfParkinglock').val(result.statusOfParking);

                $('#myModalParkingLock').modal('show');
                $('#btnLockParking').show();
            }

        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}

function LockParking() {
    var emplockObj = {
        ParkingPlaceID: $('#ParkingPlaceIDlock').val(),
        NameOfParking: $('#NameOfParkinglock').val(),
        Location: $('#Locationlock').val(),
        NumberOfCar: $('#NumberOfCarlock').val(),
        NumberOfMotoBike: $('#NumberOfMotoBikelock').val(),
        NumberCarBlank: $('#NumberCarBlanklock').val(),
        NumberMotoBikeBlank: $('#NumberMotoBikeBlanklock').val(),
        
        StatusOfParkingPlace: 0,
    };
    $.ajax({
        url: "/ManagePPlace/UpdatePP",
        data: JSON.stringify(emplockObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "UpdateFalse") {
                alert("Khóa bãi đỗ không thành công!");
            } else {
                $('#tbPPlace').DataTable().clear().destroy();
                loadDataParkingPlace();
                $('#myModalParkingLock').modal('hide');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UnlockParking() {
    var empParkingObj = {
        ParkingPlaceID: $('#ParkingPlaceIDUnLock').val(),
        NameOfParking: $('#NameOfParkingUnlock').val(),
        Location: $('#LocationUnlock').val(),
        NumberOfCar: $('#NumberOfCarUnlock').val(),
        NumberOfMotoBike: $('#NumberOfMotoBikeUnlock').val(),
        NumberCarBlank: $('#NumberCarBlankUnlock').val(),
        NumberMotoBikeBlank: $('#NumberMotoBikeBlankUnlock').val(),
        StatusOfParkingPlace: 1,
    };
    $.ajax({
        url: "/ManagePPlace/UpdatePP",
        data: JSON.stringify(empParkingObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "UpdateFalse") {
                alert("Mở khóa bãi đỗ không thành công!");
            } else {
                $('#tbPPlace').DataTable().clear().destroy();
                loadDataParkingPlace();
                $('#myModalUnLockParking').modal('hide');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getUnLockParkingByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#ParkingPlaceIDUnLock').val(result.ParkingPlaceID);
                $('#NameOfParkingUnlock').val(result.NameOfParking);
                $('#NumberOfMotoBikeUnlock').val(result.NumberOfMotoBike);
                $('#LocationUnlock').val(result.Location);
                $('#NumberOfCarUnlock').val(result.NumberOfCar);

                $('#NumberCarBlankUnlock').val(result.NumberCarBlank);
                $('#NumberMotoBikeBlankUnlock').val(result.NumberMotoBikeBlank);

                $('#myModalUnLockParking').modal('show');
                $('#btnUnLockParking').show();
            }

        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}