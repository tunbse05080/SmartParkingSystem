using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SmartParkingApplication.Controllers
{
    //[Authorize(Roles = "Quản lý")]
    public class ManageUserController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageUser
        public ActionResult Index()
        {
            //List<User> list = db.Users.ToList();

            return View();
        }

        //load data User Staff
        public JsonResult LoadData()
        {
            var users = (from u in db.Users
                         where u.Account.Role.RoleID == 1
                         orderby u.UserID
                         select new
                         {
                             u.UserID,
                             u.Name,
                             u.DateOfBirth,
                             u.Gender,
                             u.UserAddress,
                             u.IdentityCard,
                             u.Phone,
                             u.email,
                             u.StatusOfwork,
                             u.ParkingPlace.NameOfParking,
                             u.Account.Role.RoleName,
                             u.Account.StatusOfAccount
                         }).ToList();

            List<Object> list = new List<object>();
            foreach (var item in users)
            {
                var datebirth = item.DateOfBirth.Value.ToString("dd/MM/yyyy");
                //var expdateFormES = item.ContractExpirationDate.Value.ToString("yyyy/MM/dd");
                string gender = string.Empty;
                switch (item.Gender)
                {
                    case 0:
                        gender = "Nữ";
                        break;
                    case 1:
                        gender = "Nam";
                        break;
                }
                string statusOfwork = string.Empty;
                switch (item.StatusOfwork)
                {
                    case 0:
                        statusOfwork = "Đang trong ca";
                        break;
                    case 1:
                        statusOfwork = "Không trong ca";
                        break;
                }
                var tr = new { item.UserID, item.Name, DateOfBirth = datebirth, Gender = gender, item.UserAddress, item.IdentityCard, item.Phone, item.email, StatusOfWork = statusOfwork, item.NameOfParking, item.RoleName, item.StatusOfAccount };
                list.Add(tr);
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //detail info User
        public JsonResult Details(int id)
        {
            var user = db.Users.Find(id);
            var gender = "";
            var dateOfBirth = "";
            var statusOfwork = "";
            if (user.Gender == 1)
            {
                gender = "Nữ";
            }
            else
            {
                gender = "Nam";
            }
            if (user.StatusOfwork == 0)
            {
                statusOfwork = "Đang trong ca";
            }
            else
            {
                statusOfwork = "Không trong ca";
            }
            var status = user.StatusOfwork;
            dateOfBirth = user.DateOfBirth.Value.ToString("MM/dd/yyyy");
            //var contractSigningDate = user.ContractSigningDate.Value.ToString("MM/dd/yyyy");
            //var contractExpirationDate = user.ContractExpirationDate.Value.ToString("MM/dd/yyyy");
            var result = new { user.UserID, user.Name, user.UserAddress, gender, dateOfBirth, user.Phone, user.email, user.IdentityCard, user.ParkingPlace.NameOfParking, user.Account.Role.RoleName, user.StatusOfwork, statusOfwork, user.AccountID, user.Account.UserName, user.Gender, user.ParkingPlaceID };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //Create User
        public JsonResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
            }

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        //update User
        public JsonResult Update(User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
            }

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        //combobox Gender
        public JsonResult ComboboxGender()
        {
            var list = db.Users.Select(u => u.Gender).Distinct().ToList();
            List<string> result = new List<string>();
            foreach (var item in list)
            {
                var gender = "";
                switch (item)
                {
                    case 0:
                        gender = "Nam";
                        result.Add(gender);
                        break;
                    case 1:
                        gender = "Nữ";
                        result.Add(gender);
                        break;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // combobox status of work
        public JsonResult ComboboxStatusOfwork()
        {
            var list = db.Users.Select(u => u.StatusOfwork).Distinct().ToList();
            List<string> result = new List<string>();
            foreach (var item in list)
            {
                var statusOfwork = "";
                switch (item)
                {
                    case 0:
                        statusOfwork = "Đang trong ca";
                        result.Add(statusOfwork);
                        break;
                    case 1:
                        statusOfwork = "Không trong ca";
                        result.Add(statusOfwork);
                        break;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //combobox parking place user
        public JsonResult ComboboxParkingPlace()
        {
            var list = from p in db.ParkingPlaces
                       select new { p.ParkingPlaceID, p.NameOfParking };
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //combobox Rolename user
        public JsonResult ComboboxRoleName()
        {
            var list = from r in db.Roles
                       select new { r.RoleID, r.RoleName };
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //combobox UserName
        public JsonResult ComboboxUserName(int ParkingPlaceID)
        {
            var result = (from u in db.Users
                          where u.ParkingPlaceID == ParkingPlaceID && u.Account.RoleID == 1
                          select new { u.UserID, u.Account.UserName }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get name of staff base on UserID
        public JsonResult GetNameStaff(int id)
        {
            var result = (from u in db.Users
                          where u.UserID == id
                          select new { u.Name }).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //Working calendar
        public ActionResult WorkingCalendar()
        {
            return View();
        }
        //load data to fullcalendar
        public JsonResult LoadDataCalendar(int ParkingPlaceID)
        {
            List<Object> list = new List<object>();
            var result = (from us in db.UserSchedules
                          where us.User.ParkingPlaceID == ParkingPlaceID
                          select new { us.ScheduleID, us.User.Name, us.Schedule.TimeStart, us.Schedule.TimeEnd }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get datetime by working shift
        public List<DateTime> GetTimeByShift(Schedule schedule)
        {
            List<DateTime> list = new List<DateTime>();
            //declare timeStart and timeEnd
            DateTime timeStart = DateTime.Now;
            DateTime timeEnd = DateTime.Now;
            if (schedule.Slot == 1)
            {
                //set timeStart and timeEnd equal time shift 1
                timeStart = (DateTime)schedule.TimeStart + TimeSpan.Parse("06:00:00");
                timeEnd = (DateTime)schedule.TimeStart + TimeSpan.Parse("14:00:00");
            }
            else if (schedule.Slot == 2)
            {
                //set timeStart and timeEnd equal time shift 2
                timeStart = (DateTime)schedule.TimeStart + TimeSpan.Parse("14:00:00");
                timeEnd = (DateTime)schedule.TimeStart + TimeSpan.Parse("22:00:00");
            }
            else
            {
                //set timeStart and timeEnd equal time shift 2
                timeStart = (DateTime)schedule.TimeStart + TimeSpan.Parse("22:00:00");
                timeEnd = (DateTime)schedule.TimeStart + TimeSpan.Parse("06:00:00");
            }
            list.Add(timeStart);
            list.Add(timeEnd);
            return list;
        }
        
        //get datetime and create schedule for user
        public JsonResult GetTimeToCreateCalendar(Schedule schedule, int UserID)
        {
            //get number day between dateStart and dateEnd
            TimeSpan timeSpan = (TimeSpan)(schedule.TimeEnd - schedule.TimeStart);
            //create UserSchedule for each date
            for (int i = 0; i <= timeSpan.Days; i++)
            {
                //declare timeStart and timeEnd
                DateTime timeStart = DateTime.Now;
                DateTime timeEnd = DateTime.Now;
                List<DateTime> list = GetTimeByShift(schedule);
                timeStart = list.First();
                timeEnd = list.Last();
                //each for, timeStart increase 1 day
                timeStart = timeStart.AddDays(i);
                //each for, timeEnd increase 2 days if shift 3
                if (schedule.Slot == 3)
                {
                    timeEnd = timeEnd.AddDays(i + 1);
                }
                else
                {
                    timeEnd = timeEnd.AddDays(i);
                }
                Schedule newSchedule = new Schedule { TimeStart = timeStart, TimeEnd = timeEnd, Slot = schedule.Slot, ParkingPlaceID = schedule.ParkingPlaceID };
                //check schedule exist or not
                if (IsCreatedSchedule(newSchedule) == 0)
                {
                    //create working schedule
                    int scheduleID = CreateWorkingCalendar(newSchedule);
                    UserSchedule newUS = new UserSchedule { UserID = UserID, ScheduleID = scheduleID };
                    //create working schedule for user
                    CreateUserSchedule(newUS);
                }
            }
            var result = "";
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get datetime and update schedule for user
        public JsonResult GetTimeToUpdateCalendar(Schedule schedule, int UserID)
        {
            //get number day between dateStart and dateEnd
            TimeSpan timeSpan = (TimeSpan)(schedule.TimeEnd - schedule.TimeStart);
            //update UserSchedule for each date
            for (int i = 0; i <= timeSpan.Days; i++)
            {
                //declare timeStart and timeEnd
                DateTime timeStart = DateTime.Now;
                DateTime timeEnd = DateTime.Now;
                List<DateTime> list = GetTimeByShift(schedule);
                timeStart = list.First();
                timeEnd = list.Last();
                //each for, timeStart increase 1 day
                timeStart = timeStart.AddDays(i);
                //each for, timeEnd increase 2 days if shift 3
                if (schedule.Slot == 3)
                {
                    timeEnd = timeEnd.AddDays(i + 1);
                }
                else
                {
                    timeEnd = timeEnd.AddDays(i);
                }
                Schedule newSchedule = new Schedule { TimeStart = timeStart, TimeEnd = timeEnd, Slot = schedule.Slot , ParkingPlaceID = schedule.ParkingPlaceID};
                //check Schedule exist or not
                if (IsCreatedSchedule(newSchedule) != 0)
                {
                    int scheduleID = IsCreatedSchedule(newSchedule);
                    //check UserSchedule exist or not
                    if (IsCreatedUserSchedule(scheduleID).UserScheduleID != 0)
                    {
                        //find UserSchedule base on ScheduleID
                        UserSchedule userSchedule = IsCreatedUserSchedule(scheduleID);
                        userSchedule.UserID = UserID;
                        UpdateWorkingcalendar(userSchedule);
                    }
                }
            }
            var result = "";
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //check Schedule exist or not if not return ScheduleID
        public int IsCreatedSchedule(Schedule schedule)
        {
            int temp = 0;
            var result = (from s in db.Schedules
                         where DateTime.Compare((DateTime)s.TimeStart, (DateTime)schedule.TimeStart) == 0 && DateTime.Compare((DateTime)s.TimeEnd, (DateTime)schedule.TimeEnd) == 0 && s.ParkingPlaceID == schedule.ParkingPlaceID
                         select new { s.ScheduleID }).FirstOrDefault();
            if(result != null)
            {
                temp = result.ScheduleID;
            }
            return temp;
        }

        //check UserSchedule exist or not if not return UserSchedule
        public UserSchedule IsCreatedUserSchedule(int ScheduleID)
        {
            var result = (from us in db.UserSchedules
                         where us.ScheduleID == ScheduleID
                         select new { us.UserScheduleID, us.ScheduleID }).FirstOrDefault();
            UserSchedule userSchedule = new UserSchedule { UserScheduleID = result.UserScheduleID, ScheduleID = result.ScheduleID };
            return userSchedule;
        }

        //create Userschedule
        public void CreateUserSchedule(UserSchedule userSchedule)
        {
            if (ModelState.IsValid)
            {
                db.UserSchedules.Add(userSchedule);
                db.SaveChanges();
            }
        }
        //create Schedule
        public int CreateWorkingCalendar(Schedule schedule)
        {
            if (ModelState.IsValid)
            {
                db.Schedules.Add(schedule);
                db.SaveChanges();
            }
            return schedule.ScheduleID;
        }

        //Update UserSchedule
        public JsonResult UpdateWorkingcalendar(UserSchedule userSchedule)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userSchedule).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(userSchedule, JsonRequestBehavior.AllowGet);
        }

        //Export Working Calendar
        
        //public ActionResult ExportWorkingCalendar()
        //{
        //    var schedule = db.Schedules.ToList();
        //    var useschedule = db.UserSchedules.ToList();
        //    // var role = db.Roles.ToList();
        //    var alluser = new GridView();
        //    //===================================================
        //    DataTable dt = new DataTable();
        //    //Add Datacolumn
        //    DataColumn workCol = dt.Columns.Add("Tên chủ thẻ", typeof(String));

        //    dt.Columns.Add("Ca làm việc", typeof(String));
        //    dt.Columns.Add("Số điện thoại", typeof(String));
        //    dt.Columns.Add("Email", typeof(String));
        //    dt.Columns.Add("Loại xe", typeof(String));
        //    dt.Columns.Add("Ngày đăng kí", typeof(String));
        //    dt.Columns.Add("Ngày hết hạn", typeof(String));

        //    foreach (var item in MonthlyTicketUser)
        //    {
        //        DataRow newRow = dt.NewRow();
        //        // newRow["Họ tên"] = item.UserName;
        //        //newRow["Phòng ban"] = item.email;
        //        //newRow["Chức vụ"] = item.ParkingPlace.NameOfParking;
        //        //newRow["Học vấn"] = item.Name;
        //        //newRow["Chuyên ngành"] = item.UserAddress;
        //        string typeVehicle = "";
        //        switch (item.TypeOfVehicle)
        //        {
        //            case 0:
        //                typeVehicle = "Xe Máy";
        //                break;
        //            case 1:
        //                typeVehicle = "Ô tô";
        //                break;
        //        }
        //        newRow["Tên chủ thẻ"] = item.CusName;
        //        newRow["Số CMND"] = item.IdentityCard;
        //        newRow["Số điện thoại"] = item.Phone;
        //        newRow["Email"] = item.Email;
        //        newRow["Loại xe"] = typeVehicle;
        //        newRow["Ngày đăng kí"] = item.RegisDate;
        //        newRow["Ngày hết hạn"] = item.ExpiryDate;
        //        //newRow["Số CMND"] = item.IdentityCard;
        //        //// newRow["Ngày ký HĐ"] = item.UserName;
        //        //// newRow["Ngày hết HĐ"] = item.UserName;
        //        //newRow["Ngày Ký HĐ"] = item.ContractSigningDate;
        //        //newRow["Ngày Hết HĐ"] = item.ContractExpirationDate;
        //        //newRow["Ngày Gia hạn"] = item.ContractRenewalDate;
        //        //newRow["Chức vụ"] = item.Role.RoleName;
        //        //newRow["Bãi làm việc"] = item.ParkingPlace.NameOfParking;
        //        // newRow["Số CMND"] = item.UserName;
        //        //full fesh

        //        dt.Rows.Add(newRow);
        //    }

        //    //====================================================
        //    alluser.DataSource = dt;
        //    // gv.DataSource = ds;
        //    alluser.DataBind();

        //    Response.ClearContent();
        //    Response.Buffer = true;

        //    Response.AddHeader("content-disposition", "attachment; filename=danh-sach.xls");
        //    Response.ContentType = "application/ms-excel";

        //    Response.Charset = "";
        //    StringWriter objStringWriter = new StringWriter();
        //    HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);

        //    alluser.RenderControl(objHtmlTextWriter);

        //    Response.Output.Write(objStringWriter.ToString());
        //    Response.Flush();
        //    Response.End();
        //    return Redirect("/ManageUser/WorkingCalendar");
        //}

        //dispose
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}