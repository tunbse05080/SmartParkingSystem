using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageAccountController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageAccount
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LoadDataAccount()
        {
            var accounts = (from a in db.Accounts
                        select new { a.AccountID, a.Role.RoleName, a.UserName, a.StatusOfAccount }).ToList();
            List < Object > list = new List<object>();
            foreach (var item in accounts)
            {
                var status = "";
                switch (item.StatusOfAccount)
                {
                    case 0:
                        status = "Not đã khóa";
                        break;
                    case 1:
                        status = "Đã khóa";
                        break;
                }
                var tr = new { item.AccountID, item.UserName, item.RoleName, status, item.StatusOfAccount };
                list.Add(tr);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        // GET: Users/Details/5
        public JsonResult Details(int id)
        {
            var account = db.Accounts.Find(id);
            return Json(account, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create(Account account)
        {
            if (ModelState.IsValid)
            {
                db.Accounts.Add(account);
                db.SaveChanges();
            }

            return Json(account, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Account account)
        {
            if (ModelState.IsValid)
            {
                db.Entry(account).State = EntityState.Modified;
                db.SaveChanges();
            }

            return Json(account, JsonRequestBehavior.AllowGet);
        }
    }
}