$(document).ready(function () {
    loadDataPrice();
});

function loadDataPrice(changsizepr) {
    var namepr = $('#txtNameSearchpr').val();
    $.ajax({
        url: "/SettingPrice/LoadDataPrice",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            namepr: namepr,
            pagepr: pageConfigpr,
            pageSizepr: 5,

        },
        dataType: "json",
        success: function (result) {
            var data = result.datapr;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.TypeOfvehicle + '</td>';
                html += '<td>' + item.DayPrice + '</td>';
                html += '<td>' + item.MonthPrice + '</td>';
                html += '<td>' + item.FirstBlock + '</td>';
                html += '<td>' + item.NextBlock + '</td>';
                html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button><button class="btn btn-success" style="width:109px" onclick="return getEditByID(' + item.PriceID + ')" > Sửa</button></td>';
                html += '</tr>';

            });
            $('#tbodypr').html(html);

            $("#tbPrice").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tbPrice_wrapper .col-md-6:eq(0)');
        },
        error: function () {

        }
    });
}

function ComboboxTypeOfvehicle() {
    $.ajax({
        url: "/SettingPrice/ComboboxTypeOfVehicle",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 1;
            $.each(result, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbTypeOfvehicle").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function UpdatePR() {
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
    var typeofVehicle = $('#cbTypeOfvehicle').val();
    var empPRObj = {

        TypeOfvehicle: typeofVehicle,
        DayPrice: $('#DayPriceEdit').val(),
        MonthPrice: $('#MonthPriceEdit').val(),
        FirstBlock: $('#FirstBlockEdit').val(),
        NextBlock: $('#NextBlockEdit').val(),
    };
    $.ajax({
        url: "/SettingPrice/UpdatePR",
        data: JSON.stringify(empPRObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPrice(true);
            $('#myModalUpdatePR').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function getByTypeOfVehicle(PriceID) {
    $.ajax({
        url: "/SettingPrice/Details/" + PriceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {

            $('#Idd').val(result.PriceID);
            $('#TypeOfvehicled').val(result.TypeOfvehicle);
            $('#DayPriced').val(result.DayPrice);
            $('#MonthPriced').val(result.MonthPrice);
            $('#DateOfBirthd').val(result.FirstBlock);
            $('#FirstBlockd').val(result.NextBlock);


            $('#myModalSettingPrice').modal('show');
            $('#btnUpdate').show();

        },
        error: function (errormessage) {
            alert("Exception:" + PriceID + errormessage.responseText);
        }
    });
    return false;
}

function reloadModalPR() {
    if ($("#cbTypeOfvehicle").val() == "0") {

        $("#myModalSettingPrice").modal("show");
    }
    else ($("#cbTypeOfvehicle").val() == "1")
    {

        $("#myModalSettingPrice").modal("show");
    }

}
function getEditPriceByID(PriceID) {
    $.ajax({
        url: "/SettingPrice/PriceDetails/" + PriceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#PriceIDed').val(result.PriceID);
            $('#TypeOfvehicled').val(result.TypeOfvehicle);
            $('#DayPriced').val(result.DayPrice);
            $('#MonthPriced').val(result.MonthPrice);
            $('#FirstBlockd').val(result.FirstBlock);
            $('#NextBlockd').val(result.NextBlock);

            $('#myModalPREdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}