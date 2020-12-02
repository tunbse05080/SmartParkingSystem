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

        public JsonResult LoadData(int page, String name,int pageSize = 5)
        {
            var users = from r in db.Roles
                        join u in db.Users on r.RoleID equals u.RoleID into table1
                        from u in table1.DefaultIfEmpty()
                        join p in db.ParkingPlaces on u.ParkingPlaceID equals p.ParkingPlaceID into table2
                        from p in table2.DefaultIfEmpty()
                        orderby u.UserID
                        select new { u.UserID, u.UserName, u.Name, u.DateOfBirth, u.Gender, u.UserAddress, u.IdentityCard, u.Phone, u.email, u.ContractSigningDate, u.ContractExpirationDate, p.NameOfParking, r.RoleName };
            if (!string.IsNullOrEmpty(name))
            {
                users = users.Where(x => x.Name.Contains(name));
            }
            var totalRow = users.Count();
            users = users.Skip((page - 1) * pageSize).Take(pageSize);
            
            return Json(new { data = users, total = totalRow }, JsonRequestBehavior.AllowGet);
        }

        // GET: Users/Details/5
        public JsonResult Details(int id)
        {
            var employee = db.Users.Find(id);
            var gender = "";
            var dateOfBirth = "";
            if (employee.Gender == 1)
            {
                gender = "Nữ";
            }
            else
            {
                gender = "Nam";
            }
            dateOfBirth = employee.DateOfBirth.Value.ToString("dd/MM/yyyy");
            var contractSigningDate = employee.ContractSigningDate.Value.ToString("dd/MM/yyyy");
            var contractExpirationDate = employee.ContractExpirationDate.Value.ToString("dd/MM/yyyy");
            var result = new {  employee.UserID, employee.UserName, employee.Name, employee.UserAddress, gender, dateOfBirth, employee.Phone, employee.email, employee.IdentityCard, employee.ParkingPlace.NameOfParking,employee.Role.RoleName, contractSigningDate, contractExpirationDate};
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
        public ActionResult XuatFileExel()
        {

            var ds = db.Users.ToList();
            var phong = db.ParkingPlaces.ToList();
            var gv = new GridView();
            //===================================================
            DataTable dt = new DataTable();
            //Add Datacolumn
            DataColumn workCol = dt.Columns.Add("Họ tên", typeof(String));

            dt.Columns.Add("Phòng ban", typeof(String));
            dt.Columns.Add("Chức vụ", typeof(String));
            dt.Columns.Add("Học vấn", typeof(String));
            dt.Columns.Add("Chuyên ngành", typeof(String));

            //Add in the datarow


            foreach (var item in ds)
            {
                DataRow newRow = dt.NewRow();
                newRow["Họ tên"] = item.UserName;
                newRow["Phòng ban"] = item.email;
                newRow["Chức vụ"] = item.ParkingPlace;
                newRow["Học vấn"] = item.Name;
                newRow["Chuyên ngành"] = item.UserAddress;

                dt.Rows.Add(newRow);
            }

            //====================================================
            gv.DataSource = dt;
            // gv.DataSource = ds;
            gv.DataBind();

            Response.ClearContent();
            Response.Buffer = true;

            Response.AddHeader("content-disposition", "attachment; filename=danh-sach.xls");
            Response.ContentType = "application/ms-excel";

            Response.Charset = "";
            StringWriter objStringWriter = new StringWriter();
            HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);

            gv.RenderControl(objHtmlTextWriter);

            Response.Output.Write(objStringWriter.ToString());
            Response.Flush();
            Response.End();
            return Redirect("/ManageUser");
        }
        }
}