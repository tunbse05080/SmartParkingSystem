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
            return View();
        }

        //load data User Staff
        public JsonResult LoadData()
        {
            List<Object> list = new List<object>();
            try
            {
                var users = (from u in db.Users
                             where u.Account.Role.RoleID == 1 || u.Account.RoleID == null
                             orderby u.UserID
                             select new
                             {
                                 u.UserID,
                                 u.Name,
                                 u.DateOfBirth,
                                 u.UserAddress,
                                 u.IdentityCard,
                                 u.Phone,
                                 u.email,
                                 u.StatusOfwork,
                                 u.ParkingPlace.NameOfParking,
                                 u.Account.Role.RoleName,
                                 u.Account.StatusOfAccount
                             }).ToList();


                foreach (var item in users)
                {
                    var datebirth = item.DateOfBirth.Value.ToString("dd/MM/yyyy");
                    //var expdateFormES = item.ContractExpirationDate.Value.ToString("yyyy/MM/dd");
                    string statusOfwork = string.Empty;
                    switch (item.StatusOfwork)
                    {
                        case 0:
                            statusOfwork = "Đang trong ca";
                            break;
                        case 1:
                            statusOfwork = "Không trong ca";
                            break;
                        case 2:
                            statusOfwork = "Trống";
                            break;
                    }
                    int statusOfAccount = 0;
                    if (item.StatusOfAccount == null)
                    {
                        statusOfAccount = 2;
                    }
                    else
                    {
                        statusOfAccount = (int)item.StatusOfAccount;
                    }
                    var tr = new { item.UserID, item.Name, DateOfBirth = datebirth, item.UserAddress, item.IdentityCard, item.Phone, item.email, StatusOfWork = statusOfwork, item.NameOfParking, statusOfAccount };
                    list.Add(tr);
                }
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //detail info User
        public JsonResult Details(int id)
        {
            try
            {
                var user = db.Users.Find(id);
                var gender = "";
                var dateOfBirth = "";
                var statusOfwork = "";
                switch (user.Gender)
                {
                    case 0:
                        gender = "Nam";
                        break;
                    case 1:
                        gender = "Nữ";
                        break;
                }
                switch (user.StatusOfwork)
                {
                    case 0:
                        statusOfwork = "Đang trong ca";
                        break;
                    case 1:
                        statusOfwork = "Không trong ca";
                        break;
                    case 2:
                        statusOfwork = "Trống";
                        break;
                }
                string roleName = "";
                string userName = "";
                if (user.AccountID == null)
                {
                    roleName = "Trống";
                    userName = "Trống";
                }
                else
                {
                    roleName = user.Account.Role.RoleName;
                    userName = user.Account.UserName;
                }
                var status = user.StatusOfwork;
                dateOfBirth = user.DateOfBirth.Value.ToString("MM/dd/yyyy");
                var result = new { user.UserID, user.Name, user.UserAddress, gender, dateOfBirth, user.Phone, user.email, user.IdentityCard, user.ParkingPlace.NameOfParking, roleName, user.StatusOfwork, statusOfwork, user.AccountID, userName, user.Gender, user.ParkingPlaceID };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            
        }

        //check Identity Card exist or not if not exist, create user
        public JsonResult CheckIdentityCardToAdd(User user)
        {
            var check = true;
            try
            {
                var result = (from u in db.Users
                              where u.IdentityCard == user.IdentityCard
                              select new { u.IdentityCard }).FirstOrDefault();
                if (result == null)
                {
                    Create(user);
                    check = false;
                }
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        //check Identity Card exist or not if not exist, update user
        public JsonResult CheckIdentityCardToUpdate(User user)
        {
            var check = true;
            try
            {
                var result = (from u in db.Users
                              where u.IdentityCard == user.IdentityCard
                              select new { u.IdentityCard }).FirstOrDefault();
                var result2 = (from u in db.Users
                               where u.UserID == user.UserID
                               select new { u.IdentityCard }).FirstOrDefault();
                if (result == null || result2.IdentityCard == user.IdentityCard)
                {
                    Update(user);
                    check = false;
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        //Create User
        public void Create(User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
        }

        //update User
        public JsonResult Update(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(user).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(user, JsonRequestBehavior.AllowGet);
        }

        //combobox Gender
        public JsonResult ComboboxGender()
        {
            List<string> result = new List<string>();
            try
            {
                var list = db.Users.Select(u => u.Gender).Distinct().ToList();

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
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // combobox status of work
        public JsonResult ComboboxStatusOfwork()
        {
            List<string> result = new List<string>();
            try
            {
                var list = db.Users.Select(u => u.StatusOfwork).Distinct().ToList();

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
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //combobox parking place user
        public JsonResult ComboboxParkingPlace()
        {
            try
            {
                var list = from p in db.ParkingPlaces
                           select new { p.ParkingPlaceID, p.NameOfParking };
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //combobox Rolename user
        public JsonResult ComboboxRoleName()
        {
            try
            {
                var list = from r in db.Roles
                           select new { r.RoleID, r.RoleName };
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //combobox UserName
        public JsonResult ComboboxUserName(int ParkingPlaceID)
        {
            try
            {
                var result = (from u in db.Users
                              where u.ParkingPlaceID == ParkingPlaceID && u.Account.RoleID == 1
                              select new { u.UserID, u.Account.UserName }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //get name of staff base on UserID
        public JsonResult GetNameStaff(int id)
        {
            try
            {
                var result = (from u in db.Users
                              where u.UserID == id
                              select new { u.Name }).FirstOrDefault();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //Working calendar
        public ActionResult WorkingCalendar()
        {
            return View();
        }
        //load data to fullcalendar
        public JsonResult LoadDataCalendar(int ParkingPlaceID)
        {
            try
            {
                var result = (from us in db.UserSchedules
                              where us.User.ParkingPlaceID == ParkingPlaceID
                              select new { us.UserScheduleID, us.User.Name, us.Schedule.TimeStart, us.Schedule.TimeEnd }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

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
            var result = "";
            try
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
                        //check this user exist or not in newschedule 
                    }
                    else if (checkUserSchedule(UserID, newSchedule) == true)
                    {
                        //create working schedule
                        int scheduleID = CreateWorkingCalendar(newSchedule);
                        UserSchedule newUS = new UserSchedule { UserID = UserID, ScheduleID = scheduleID };

                        //create working schedule for user
                        CreateUserSchedule(newUS);
                    }
                }
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateWorkingShift(int id, int userid)
        {
            try
            {
                UserSchedule userSchedule = db.UserSchedules.Find(id);
                userSchedule.UserID = userid;
                if (checkUserSchedule(userid, userSchedule.Schedule) == true)
                {
                    UpdateWorkingcalendar(userSchedule);
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }

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

        public bool checkUserSchedule(int UserID, Schedule schedule)
        {
            var result = (from s in db.UserSchedules
                          where DateTime.Compare((DateTime)s.Schedule.TimeStart, (DateTime)schedule.TimeStart) == 0 && DateTime.Compare((DateTime)s.Schedule.TimeEnd, (DateTime)schedule.TimeEnd) == 0 && s.UserID == UserID
                          select new { s.UserScheduleID }).FirstOrDefault();
                         
            if(result != null) {
                return false; //Tim thay userID da lam viec trong ca nay
            }
            else
            {
                return true; //Khong tim thay userID da lam viec trong ca nay
            }
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
        public void UpdateWorkingcalendar(UserSchedule userSchedule)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userSchedule).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

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