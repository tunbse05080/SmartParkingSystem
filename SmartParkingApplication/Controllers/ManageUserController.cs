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
    public class ManageUserController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageUser
        public ActionResult Index()
        {
            //List<User> list = db.Users.ToList();
            
            return View();
        }

        public JsonResult LoadData()
        {
            var users = from r in db.Roles
                        join u in db.Users on r.RoleID equals u.RoleID into table1
                        from u in table1.DefaultIfEmpty()
                        join p in db.ParkingPlaces on u.ParkingPlaceID equals p.ParkingPlaceID into table2
                        from p in table2.DefaultIfEmpty()
                        orderby u.UserID
                        select new { u.UserID, u.UserName, u.Name, u.DateOfBirth, u.Gender, u.UserAddress, u.IdentityCard, u.Phone, u.email, u.ContractSigningDate, u.ContractExpirationDate,u.StatusOfWork, p.NameOfParking, r.RoleName };

            List<Object> list = new List<object>();
            foreach (var item in users)
            {
                var datebirth = item.DateOfBirth.Value.ToString("dd/MM/yyyy");
                var signdate = item.ContractSigningDate.Value.ToString("dd/MM/yyyy");
                var expdate = item.ContractExpirationDate.Value.ToString("dd/MM/yyyy");
                string gender = string.Empty;
                switch(item.Gender)
                {
                    case 0:
                        gender = "Nữ";
                        break;
                    case 1:
                        gender = "Nam";
                        break;
                }
                string statusOfwork = string.Empty;
                switch (item.StatusOfWork)
                {
                    case 0:
                        statusOfwork = "Hết hạn HĐ";
                        break;
                    case 1:
                        statusOfwork = "Đang trong HĐ";
                        break;
                }
                var tr = new { UserID = item.UserID, UserName = item.UserName, Name = item.Name, DateOfBirth = datebirth, Gender = gender, UserAddress = item.UserAddress, IdentityCard = item.IdentityCard, Phone = item.Phone, email = item.email, ContractSigningDate = signdate, ContractExpirationDate = expdate, StatusOfWork = statusOfwork, NameOfParking = item.NameOfParking, RoleName = item.RoleName };
                list.Add(tr);
            }
            
            return Json(new { data = list}, JsonRequestBehavior.AllowGet);
        }

        // GET: Users/Details/5
        public JsonResult Details(int id)
        {
            var employee = db.Users.Find(id);
            var gender = "";
            var dateOfBirth = "";
            var statusOfwork = "";
            if (employee.Gender == 1)
            {
                gender = "Nữ";
            }
            else
            {
                gender = "Nam";
            }
            if (employee.StatusOfWork == 1)
            {
                statusOfwork = "Đang trong HĐ";
            }
            else
            {
                statusOfwork = "Hết hạn HĐ";
            }
            dateOfBirth = employee.DateOfBirth.Value.ToString("MM/dd/yyyy");
            var contractSigningDate = employee.ContractSigningDate.Value.ToString("MM/dd/yyyy");
            var contractExpirationDate = employee.ContractExpirationDate.Value.ToString("MM/dd/yyyy");
            var result = new {  employee.UserID, employee.UserName, employee.Name, employee.UserAddress,employee.PassWork, gender, dateOfBirth, employee.Phone, employee.email, employee.IdentityCard, employee.ParkingPlace.NameOfParking, employee.Role.RoleName, contractSigningDate, contractExpirationDate, statusOfwork };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DetailsGH(int id)
        {
            var employee = db.Users.Find(id);
            var dateOfBirth = "";
            dateOfBirth = employee.DateOfBirth.Value.ToString("MM/dd/yyyy");
            var contractSigningDate = employee.ContractSigningDate.Value.ToString("MM/dd/yyyy");
            var contractExpirationDate = employee.ContractExpirationDate.Value.ToString("MM/dd/yyyy");
            var result = new { employee.UserID, employee.UserName, employee.Name, employee.UserAddress, employee.PassWork, employee.Gender, dateOfBirth, employee.Phone, employee.email, employee.IdentityCard, ParkingPlaceID = employee.ParkingPlace.ParkingPlaceID, RoleID = employee.Role.RoleID, contractSigningDate, contractExpirationDate, employee.StatusOfWork };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        public JsonResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
            }

            return Json(user,JsonRequestBehavior.AllowGet);
        }

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
            foreach(var item in list)
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
            return Json(result,JsonRequestBehavior.AllowGet);
        }


        // combobox status of work
        public JsonResult ComboboxStatusOfwork()
        {
            var list = db.Users.Select(u => u.StatusOfWork).Distinct().ToList();
            List<string> result = new List<string>();
            foreach (var item in list)
            {
                var statusOfwork = "";
                switch (item)
                {
                    case 0:
                        statusOfwork = "Hết hạn HĐ";
                        result.Add(statusOfwork);
                        break;
                    case 1:
                        statusOfwork = "Đang trong HĐ";
                        result.Add(statusOfwork);
                        break;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //combobox parking place user
        public JsonResult ComboboxParkingPlace()
        {
            var list = db.ParkingPlaces.Select(u => u.NameOfParking).Distinct().ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //combobox Rolename user
        public JsonResult ComboboxRoleName()
        {
            var list = db.Roles.Select(u => u.RoleName).Distinct().ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //Working calendar
        public ActionResult WorkingCalendar()
        {
            List<Schedule> schedules = db.Schedules.ToList();
            List<User> users = db.Users.ToList();
            List<UserSchedule> userSchedules = db.UserSchedules.ToList();
            ViewData["events"] = from us in userSchedules
                                 join u in users on us.UserID equals u.UserID into table
                                 from u in table.DefaultIfEmpty()
                                 join s in schedules on us.ScheduleID equals s.ScheduleID into table1
                                 from s in table1.DefaultIfEmpty()
                                 select new MultipleTablesJoinClass { userSchedule = us, user = u, schedule = s };
            return View(ViewData["events"]);
        }

        //Edit working calendar
        public ActionResult Editworkingcalendar()
        {
            List<Schedule> schedules = db.Schedules.ToList();
            List<User> users = db.Users.ToList();
            List<UserSchedule> userSchedules = db.UserSchedules.ToList();
            ViewData["events"] = from us in userSchedules
                                 join u in users on us.UserID equals u.UserID into table
                                 from u in table.DefaultIfEmpty()
                                 join s in schedules on us.ScheduleID equals s.ScheduleID into table1
                                 from s in table1.DefaultIfEmpty()
                                 select new MultipleTablesJoinClass { userSchedule = us, user = u, schedule = s };
            return View(ViewData["events"]);
        }

        //Xuat file Exel User
        public ActionResult XuatFileExel()
        {

            var user = db.Users.ToList();
            var parking  = db.ParkingPlaces.ToList();
            var role = db.Roles.ToList();
            var alluser = new GridView();
            //===================================================
            DataTable dt = new DataTable();
            //Add Datacolumn
            DataColumn workCol = dt.Columns.Add("Họ và tên", typeof(String));

            dt.Columns.Add("Tên Tài Khoản", typeof(String));
            dt.Columns.Add("Ngày Sinh", typeof(String));
            dt.Columns.Add("Giới tính", typeof(String));
            dt.Columns.Add("Địa chỉ", typeof(String));
            dt.Columns.Add("Số điện thoại", typeof(int));
            dt.Columns.Add("Email", typeof(String));
            dt.Columns.Add("Số CMND", typeof(int));
            dt.Columns.Add("Ngày Ký HĐ", typeof(String));
            dt.Columns.Add("Ngày Hết HĐ", typeof(String));
            // them ngay gia han
            dt.Columns.Add("Ngày Gia hạn", typeof(String));


           
            dt.Columns.Add("Chức vụ", typeof(String));
            dt.Columns.Add("Bãi làm việc", typeof(String));


            //Add in the datarow


            foreach (var item in user)
            {
                DataRow newRow = dt.NewRow();
                // newRow["Họ tên"] = item.UserName;
                //newRow["Phòng ban"] = item.email;
                //newRow["Chức vụ"] = item.ParkingPlace.NameOfParking;
                //newRow["Học vấn"] = item.Name;
                //newRow["Chuyên ngành"] = item.UserAddress;

                newRow["Họ và tên"] = item.Name;
                newRow["Ngày Sinh"] = item.DateOfBirth;
                newRow["Tên Tài Khoản"] = item.UserName;
                newRow["Giới tính"] = item.Gender;
                newRow["Địa chỉ"] = item.UserAddress;
                newRow["Số điện thoại"] = item.Phone;
                newRow["Email"] = item.email;
                newRow["Số CMND"] = item.IdentityCard;
                // newRow["Ngày ký HĐ"] = item.UserName;
                // newRow["Ngày hết HĐ"] = item.UserName;
                newRow["Ngày Ký HĐ"] = item.ContractSigningDate;
                newRow["Ngày Hết HĐ"] = item.ContractExpirationDate;
                newRow["Chức vụ"] = item.Role.RoleName;
                newRow["Bãi làm việc"] = item.ParkingPlace.NameOfParking;
               // newRow["Số CMND"] = item.UserName;
               //full fesh

                dt.Rows.Add(newRow);
            }

            //====================================================
            alluser.DataSource = dt;
            // gv.DataSource = ds;
            alluser.DataBind();

            Response.ClearContent();
            Response.Buffer = true;

            Response.AddHeader("content-disposition", "attachment; filename=danh-sach.xls");
            Response.ContentType = "application/ms-excel";

            Response.Charset = "";
            StringWriter objStringWriter = new StringWriter();
            HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);

            alluser.RenderControl(objHtmlTextWriter);

            Response.Output.Write(objStringWriter.ToString());
            Response.Flush();
            Response.End();
            return Redirect("/ManageUser");
        }
        }

     

}