$(document).ready(function () {
    LoadDataCalendar();
    checkboxDate(1);
    checkboxDate(2);
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
            let evenArr = [];
            //$('#calendarWork').fullCalendar('removeEvents');
            $.each(result, function (key, item) {
                let evenObj = {
                    id: item.ScheduleID,
                    title: item.Name,
                    start: getFormatDatetime(item.TimeStart),
                    end: getFormatDatetime(item.TimeEnd)
                }
                evenArr.push(evenObj);

            });
            initCalendar(evenArr);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

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
        eventRender: function (info) {
            // get your new title somehow
            title: "Ca",
        }
    });
    calendar.render();
}

//function CreateUserSchedule(Id) {
//    var userScheObj = {
//        UserID: $('#cbUserNameEmp').val(),
//        ScheduleID: Id
//    }
//    $.ajax({
//        url: "/ManageUser/CreateUserSchedule",
//        type: "POST",
//        data: JSON.stringify(userScheObj),
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#myModalCreateWorkingCalendar').modal('hide');
//            LoadDataCalendar();
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

function CreateWorkingCalendar() {
    //if ($('#cbWorkShiftEmp').val() == 1) {
    //    var scheObj = {
    //        TimeStart: $('#DateStart').val() + " 06:00:00",
    //        TimeEnd: $('#DateEnd').val() + " 14:00:00",
    //        Slot: $('#cbWorkShiftEmp').val()
    //    }
    //} else if ($('#cbWorkShiftEmp').val() == 2) {
    //    var scheObj = {
    //        TimeStart: $('#DateStart').val() + " 14:00:00",
    //        TimeEnd: $('#DateEnd').val() + " 22:00:00",
    //        Slot: $('#cbWorkShiftEmp').val()
    //    }
    //} else {
    //    var scheObj = {
    //        TimeStart: $('#DateStart').val() + " 22:00:00",
    //        TimeEnd: $('#DateEnd').val() + " 06:00:00",
    //        Slot: $('#cbWorkShiftEmp').val()
    //    }
    //}
    var UserID = $('#cbUserNameEmp').val();
    var checkboxDate = document.getElementById("checkboxDate");
    if (checkboxDate.checked == false) {
        //if ($('#cbWorkShiftEmp').val() == 1) {
        var scheObj = {
            TimeStart: $('#DateApply').val(),
            TimeEnd: $('#DateApply').val(),
            Slot: $('#cbWorkShiftEmp').val()
        }
        //} else if ($('#cbWorkShiftEmp').val() == 2) {
        //    var scheObj = {
        //        TimeStart: $('#DateApply').val() + " 14:00:00",
        //        TimeEnd: $('#DateApply').val() + " 22:00:00",
        //        Slot: $('#cbWorkShiftEmp').val()
        //    }
        //} else {
        //    var scheObj = {
        //        TimeStart: $('#DateApply').val() + " 22:00:00",
        //        TimeEnd: $('#DateApply').val() + " 06:00:00",
        //        Slot: $('#cbWorkShiftEmp').val()
        //    }
        //}
    } else {
        var scheObj = {
            TimeStart: $('#DateStart').val(),
            TimeEnd: $('#DateEnd').val(),
            Slot: $('#cbWorkShiftEmp').val()
        }
    }
    $.ajax({
        url: "/ManageUser/GetTimeToCreateCalendar",
        type: "POST",
        data: JSON.stringify({ schedule: scheObj, UserID: UserID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //CreateUserSchedule(result.ScheduleID);
            $('#myModalCreateWorkingCalendar').modal('hide');
            LoadDataCalendar();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function EditWorkingCalendar() {
    var UserID = $('#cbUserNameEmpEdit').val();
    if ($('#checkboxDateEdit').checked == false || !$('#checkboxDateEdit').checked) {
        if ($('#cbWorkShiftEmpEdit').val() == 1) {
            var scheObj = {
                TimeStart: $('#DateApplyEdit').val() + " 06:00:00",
                TimeEnd: $('#DateApplyEdit').val() + " 14:00:00",
                Slot: $('#cbWorkShiftEmpEdit').val()
            }
        } else if ($('#cbWorkShiftEmpEdit').val() == 2) {
            var scheObj = {
                TimeStart: $('#DateApplyEdit').val() + " 14:00:00",
                TimeEnd: $('#DateApplyEdit').val() + " 22:00:00",
                Slot: $('#cbWorkShiftEmpEdit').val()
            }
        } else {
            var scheObj = {
                TimeStart: $('#DateApplyEdit').val() + " 22:00:00",
                TimeEnd: $('#DateApplyEdit').val() + " 06:00:00",
                Slot: $('#cbWorkShiftEmpEdit').val()
            }
        }
    }
    $.ajax({
        url: "/ManageUser/CheckEditWorkingCalendar",
        type: "POST",
        data: JSON.stringify({ schedule: scheObj, UserID: UserID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#myModalEditWorkingCalendar').modal('hide');
            LoadDataCalendar();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//checkbox show to 
function checkboxDate(check) {
    if (check == 1) {
        var checkBox = document.getElementById("checkboxDate");
        if (checkBox.checked == true) {
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
        var checkBox = document.getElementById("checkboxDateEdit");
        if (checkBox.checked == true) {
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
        id = 3;
    }
    $.ajax({
        url: "/ManageUser/GetNameStaff",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if (check == 1) {
                $('#FullNameEmp').val(result.Name);
                $('myModalCreateWorkingCalendar').modal('Show');
            } else {
                $('#FullNameEmpEdit').val(result.Name);
                $('myModalEditWorkingCalendar').modal('Show');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ComboboxUserName(check) {
    if (check == 1) {
        ParkingPlaceID = $('#cbparkingPlaceEmp').val();
    } else {
        ParkingPlaceID = $('#cbparkingPlaceEmpEdit').val();
    }
    $.ajax({
        url: "/ManageUser/ComboboxUserName",
        type: "POST",
        data: JSON.stringify({ ParkingPlaceID: ParkingPlaceID, check: check }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
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
            } else {
                $("#cbUserNameEmpEdit").html(html);
                $('#cbUserNameEmpEdit').val(null).trigger('change');
                $("#cbUserNameEmpEdit").select2({
                    placeholder: "Chọn tên tài khoản",
                    allowClear: true
                });
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function clearBox(check) {
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

/* initialize the external events
 -----------------------------------------------------------------*/
    //function ini_events(ele) {
    //    ele.each(function () {

    //        // create an Event Object (https://fullcalendar.io/docs/event-object)
    //        // it doesn't need to have a start or end
    //        var eventObject = {
    //            title: $.trim($(this).text()) // use the element's text as the event title
    //        }

    //        // store the Event Object in the DOM element so we can get to it later
    //        $(this).data('eventObject', eventObject)

    //        // make the event draggable using jQuery UI
    //        $(this).draggable({
    //            zIndex: 1070,
    //            revert: true, // will cause the event to go back to its
    //            revertDuration: 0  //  original position after the drag
    //        })

    //    })
    //}

    //ini_events($('#external-events div.external-event'))

    ///* initialize the calendar
    // -----------------------------------------------------------------*/
    ////Date for the calendar events (dummy data)
    //var date = new Date()
    //var d = date.getDate(),
    //    m = date.getMonth(),
    //    y = date.getFullYear()

    //var Calendar = FullCalendar.Calendar;
    //var Draggable = FullCalendar.Draggable;

    //var containerEl = document.getElementById('external-events');
    //var checkbox = document.getElementById('drop-remove');
    //var calendarEl = document.getElementById('calendar');

    //// initialize the external events
    //// -----------------------------------------------------------------

    //new Draggable(containerEl, {
    //    itemSelector: '.external-event',
    //    eventData: function (eventEl) {
    //        return {
    //            title: eventEl.innerText,
    //            backgroundColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
    //            borderColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
    //            textColor: window.getComputedStyle(eventEl, null).getPropertyValue('color'),
    //        };
    //    }
    //});

    //var calendar = new Calendar(calendarEl, {
    //    headerToolbar: {
    //        left: 'prev,next today',
    //        center: 'title',
    //        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    //    },
    //    themeSystem: 'bootstrap',
    //    //Random default events
    //    events: [
    //        {
    //            title: 'All Day Event',
    //            start: new Date(y, m, 1),
    //            backgroundColor: '#f56954', //red
    //            borderColor: '#f56954', //red
    //            allDay: true
    //        },
    //        {
    //            title: 'Long Event',
    //            start: new Date(y, m, d - 5),
    //            end: new Date(y, m, d - 2),
    //            backgroundColor: '#f39c12', //yellow
    //            borderColor: '#f39c12' //yellow
    //        },
    //        {
    //            title: 'Meeting',
    //            start: new Date(y, m, d, 10, 30),
    //            allDay: false,
    //            backgroundColor: '#0073b7', //Blue
    //            borderColor: '#0073b7' //Blue
    //        },
    //        {
    //            title: 'Lunch',
    //            start: new Date(y, m, d, 12, 0),
    //            end: new Date(y, m, d, 14, 0),
    //            allDay: false,
    //            backgroundColor: '#00c0ef', //Info (aqua)
    //            borderColor: '#00c0ef' //Info (aqua)
    //        },
    //        {
    //            title: 'Birthday Party',
    //            start: new Date(y, m, d + 1, 19, 0),
    //            end: new Date(y, m, d + 1, 22, 30),
    //            allDay: false,
    //            backgroundColor: '#00a65a', //Success (green)
    //            borderColor: '#00a65a' //Success (green)
    //        },
    //        {
    //            title: 'Click for Google',
    //            start: new Date(y, m, 28),
    //            end: new Date(y, m, 29),
    //            url: 'https://www.google.com/',
    //            backgroundColor: '#3c8dbc', //Primary (light-blue)
    //            borderColor: '#3c8dbc' //Primary (light-blue)
    //        }
    //    ],
    //    editable: true,
    //    droppable: true, // this allows things to be dropped onto the calendar !!!
    //    drop: function (info) {
    //        // is the "remove after drop" checkbox checked?
    //        if (checkbox.checked) {
    //            // if so, remove the element from the "Draggable Events" list
    //            info.draggedEl.parentNode.removeChild(info.draggedEl);
    //        }
    //    }
    //});

    //calendar.render();
    //// $('#calendar').fullCalendar()

    ///* ADDING EVENTS */
    //var currColor = '#3c8dbc' //Red by default
    //// Color chooser button
    //$('#color-chooser > li > a').click(function (e) {
    //    e.preventDefault()
    //    // Save color
    //    currColor = $(this).css('color')
    //    // Add color effect to button
    //    $('#add-new-event').css({
    //        'background-color': currColor,
    //        'border-color': currColor
    //    })
    //})
    //$('#add-new-event').click(function (e) {
    //    e.preventDefault()
    //    // Get value and make sure it is not null
    //    var val = $('#new-event').val()
    //    if (val.length == 0) {
    //        return
    //    }

    //    // Create events
    //    var event = $('<div />')
    //    event.css({
    //        'background-color': currColor,
    //        'border-color': currColor,
    //        'color': '#fff'
    //    }).addClass('external-event')
    //    event.text(val)
    //    $('#external-events').prepend(event)

    //    // Add draggable funtionality
    //    ini_events(event)

    //    // Remove event from text input
    //    $('#new-event').val('')
    //})
