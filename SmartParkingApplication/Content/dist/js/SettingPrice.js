$(document).ready(function () {
    loadDataPrice();
});
var pageConfigpr = 1;

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
                html += '</tr>';
            });
            $('#tbodypr').html(html);

            $("#tbPrice").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tbPrice_wrapper .col-md-6:eq(0)');
            pagingpr(result.total, function () {
                loadDataPrice();
            }, changsizepr);
        },
        error: function () {

        }
    });
    function pagingpr(totalRowpr, callback, changePageSizepr) {
        var totalPagepr = Math.ceil(totalRowpr / 5);

        //Unbind pagination if it existed or click change pageSize
        if ($('#paginationpr').length === 0 || changePageSizepr === true) {
            $('#paginationpr').empty();
            $('#paginationpr').removeData("twbs-pagination");
            $('#paginationpr').unbind("page");
        }

        $('#paginationpr').twbsPagination({
            totalPages: totalPagepr,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            visiblePages: 10,
            onPageClick: function (event, pagepr) {
                pageConfigpr = pagepr;
                setTimeout(callback, 200);
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
        var TypeOfvehicle  = $('#cbTypeOfvehicle').val();
        var empPRObj = {
            
            TypeOfvehicle: TypeOfvehicle,
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
                var TypeOfvehicle = $('#cbTypeOfvehicle').val();
                $('#Id').val(result.PriceID);
                $('#TypeOfvehicle').val(result.TypeOfvehicle);
                $('#DayPrice').val(result.DayPrice);
                $('#MonthPrice').val(result.MonthPrice);
                $('#DateOfBirth').val(result.FirstBlock);
                $('#FirstBlock').val(result.NextBlock);
               

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
}