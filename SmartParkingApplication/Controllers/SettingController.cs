using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class SettingController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: Setting
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult LoadDataAccount(int accountID)
        {
            var set = from s in db.Users.Where(x => x.AccountID == accountID) select new { s.email,s.DateOfBirth,s.Gender,s.Name,s.Phone,s.UserAddress}; 
           

            List<Object> list = new List<object>();
            foreach (var item in set)
            {
               
               
                var tr = new { email = item.email, DateOfBirth = item.DateOfBirth, Gender = item.Gender, Name = item.Name, Phone = item.Phone, UserAddress = item.UserAddress };
                list.Add(tr);
            }

          

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SVDetails(int id,int accountID)
        {
            var sv = db.Users.Find(id,accountID);
           

            var result = new { sv.email, sv.DateOfBirth, sv.Gender, sv.Name, sv.Phone, sv.UserAddress };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}