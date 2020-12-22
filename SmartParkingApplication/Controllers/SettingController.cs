using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class SettingController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: Setting
        public ActionResult Index(int id)
        {
            var result = db.Users.Where(x=>x.UserID ==id);
            ViewBag.name = result;
            return View();
        }
        public JsonResult LoadDataAccount(int accountID)
        {
            var set = from s in db.Users.Where(x => x.AccountID == accountID) select new { s.email, s.DateOfBirth, s.Gender, s.Name, s.Phone, s.UserAddress };


            List<Object> list = new List<object>();
            foreach (var item in set)
            {


                var tr = new { email = item.email, DateOfBirth = item.DateOfBirth, Gender = item.Gender, Name = item.Name, Phone = item.Phone, UserAddress = item.UserAddress };
                list.Add(tr);
            }



            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SVDetails(string Name, int id)
        { 

            var result = db.Users.Where(x => x.AccountID == id).ToList();

            var data = db.Accounts.Where(x => x.AccountID == id).ToList();
            List<Object> list = new List<object>();
            Session["a"] = data.FirstOrDefault().Role.RoleName;
            ViewBag.name = result;
            return View();
        }
        public ActionResult Edit(int id)
        {
            var user = db.Users.Where(x => x.UserID == id).FirstOrDefault();
            return View(user);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserID,UserAddress,DateOfBirth,email,Phone,IdentityCard")] User _post)
        {

            if (ModelState.IsValid)
            {
                var data = db.Users.Find(_post.UserID);
                data.IdentityCard = _post.IdentityCard;
                data.Phone = _post.Phone;
                data.email = _post.email;
                data.DateOfBirth = _post.DateOfBirth;
                data.UserAddress = _post.UserAddress;
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                // return Json(_post);
                return RedirectToAction("Index", "Setting", new{ id = _post.UserID } );
            }
            var dataEdit = db.Users.Where(s => s.UserID == _post.UserID).FirstOrDefault();
            return View(dataEdit);

        }
    }
}