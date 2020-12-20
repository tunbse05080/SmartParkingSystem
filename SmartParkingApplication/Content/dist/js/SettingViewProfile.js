function getSVDetailByID(UserID,AccountID) {
    $.ajax({
        url: "/Setting/SVDetails/" + UserID, AccountID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {

            $('#ParkingPlaceIDd').val(result.ParkingPlaceID);
            $('#NameOfParkingd').val(result.NameOfParking);
            $('#Locationd').val(result.Location);
            $('#NumberOfCardd').val(result.NumberOfCar);
            $('#NumberOfMotoBiked').val(result.NumberOfMotoBike);
            $('#NumberCarBlankd').val(result.NumberCarBlank);
            $('#NumberMotoBikeBlankd').val(result.NumberMotoBikeBlank);
            $('#StatusOfParkingPlaced').val(result.statusOfParking);




            $('#myModalSVDetail').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + UserID + errormessage.responseText);
        }
    });
    return false;
}