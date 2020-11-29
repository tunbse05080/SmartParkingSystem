using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

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
                        select new { u.UserID, u.UserName, u.Name, u.DateOfBirth, u.Gender, u.UserAddress, u.IdentityCard, u.Phone, u.email, u.ContractSigningDate, u.ContractExpirationDate, p.NameOfParking, r.RoleName };
            
            return Json(users, JsonRequestBehavior.AllowGet);
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
            var result = new { UserID = employee.UserID, UserName = employee.UserName, Name = employee.Name, UserAddress = employee.UserAddress, gender, dateOfBirth, Phone = employee.Phone, email = employee.email, IdentityCard = employee.IdentityCard, NameOfParking = employee.ParkingPlace.NameOfParking, RoleName = employee.Role.RoleName };
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

        // GET: Users/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", user.ParkingPlaceID);
            ViewBag.RoleID = new SelectList(db.Roles, "RoleID", "RoleName", user.RoleID);
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserID,Name,UserName,PassWork,DateOfBirth,Gender,UserAddress,IdentityCard,Phone,email,RoleID,ParkingPlaceID")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", user.ParkingPlaceID);
            ViewBag.RoleID = new SelectList(db.Roles, "RoleID", "RoleName", user.RoleID);
            return View(user);
        }

        // GET: Users/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return RedirectToAction("Index");
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
                                 select new MultipleTablesJoinClass { userSchedule = us,user = u, schedule =s};
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
    }
}