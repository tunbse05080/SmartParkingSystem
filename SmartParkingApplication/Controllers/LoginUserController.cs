using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SmartParkingApplication.Models;

namespace SmartParkingApplication.Controllers
{
    public class LoginUserController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();

        // GET: LoginUser
        public ActionResult Index()
        {
            
            return View();
        }
      

        [HttpPost]
        public JsonResult ValidateUser(string username, string password)
        {
            
            var data = from u in db.Users where u.UserName == username && u.PassWork == password  select u;
            if (data.Count() > 0)
            {
                Session["UserName"] = username;
                Session["password"] = password;
                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
        }
        //public ActionResult Logout()
        //{
        //    Session.Abandon();
        //    return RedirectToAction("Index", "Login");


        //}
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }

        // GET: LoginUser/Details/5
        public ActionResult Details(int? id)
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

        // GET: LoginUser/Create
        public ActionResult Create()
        {
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking");
            ViewBag.RoleID = new SelectList(db.Roles, "RoleID", "RoleName");
            return View();
        }

        // POST: LoginUser/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "UserID,Name,UserName,PassWork,DateOfBirth,Gender,UserAddress,IdentityCard,Phone,email,ContractSigningDate,ContractExpirationDate,RoleID,ParkingPlaceID,StatusOfWork")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", user.ParkingPlaceID);
            ViewBag.RoleID = new SelectList(db.Roles, "RoleID", "RoleName", user.RoleID);
            return View(user);
        }

        // GET: LoginUser/Edit/5
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

        // POST: LoginUser/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserID,Name,UserName,PassWork,DateOfBirth,Gender,UserAddress,IdentityCard,Phone,email,ContractSigningDate,ContractExpirationDate,RoleID,ParkingPlaceID,StatusOfWork")] User user)
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

        // GET: LoginUser/Delete/5
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

        // POST: LoginUser/Delete/5
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
    }
}
