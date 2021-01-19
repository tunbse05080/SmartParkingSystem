//load page
//$(document).ready(function () {
//    loadDataStatusParking();
//    //setInterval(function () {
//    //    table.ajax.reload();
//    //}, 30000);
//});

//var table;

//Load Data function
function loadDataStatusParking() {
    var ParkingPlaceID = $('#cbxListParking').val();
    $.ajax({
        url: "/ManagePPlace/LoadDataStatusPP",
        type: "GET",
        data: { ParkingPlaceID: ParkingPlaceID },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải dữ liệu không thành công!");
            } else {
                var data = result.dataSSP;
                var html = '';
                $.each(data, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.LicensePlates + '</td>';
                    html += '<td>' + item.TimeIn + '</td>';

                    html += '<td>' + item.TypeOfTicket + '</td>';
                    html += '<td>' + item.CardNumber + '</td>';
                    html += '<td>' + item.TypeOfVerhicleTran + '</td>';
                    html += '<td><button class="btn btn-primary" onclick = "return getDetailTranByID(' + item.TransactionID + ')"> Chi tiết</button></td>';
                    html += '</tr>';
                });
                $('#tbodyStatusPP').html(html);
                $('#tbStatusPP').DataTable({
                    "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tbStatusPP_wrapper .col-md-6:eq(0)');
            }

        },
        error: function (errormessage) {
            if (timeFrom == null && timeTo == null) {
            } else {
                alert(errormessage.responseText);
            }
        }
    });
}

function runInterval() {
    setInterval(function () {
        loadDataStatusParking();
        loadTableList();
    }, 5000);
}

function getDetailTranByID(TransactionID) {
    $.ajax({
        url: "/ManagePPlace/ParkingSSDetails/" + TransactionID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#Idd').val(result.TransactionID);
                $('#LicensePlatesd').val(result.LicensePlates);
                $('#TimeInd').val(result.TimeIn);
                $('#TypeOfTicketd').val(result.typeTicket);
                $('#CardNumber').val(result.CardNumber);
                $('#TypeOfVe').val(result.typeVE);
                $('#myModalTranDetail').modal('show');
            }

        },
        error: function (errormessage) {
            alert("Exception:" + TransactionID + errormessage.responseText);
        }
    });
    return false;
}

//comboboxlistOfParking
function comboboxlistOfParking() {
    $.ajax({
        url: "/ManageUser/ComboboxParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải dữ liệu không thành công!");
            } else {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<option value="' + item.ParkingPlaceID + '">' + item.NameOfParking + '</option>';
                });
                $("#cblistOfParking").html(html);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
