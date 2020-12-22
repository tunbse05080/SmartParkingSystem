using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    [Authorize(Roles ="Admin")]
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
            var result = (from u in db.Users
                          select new { u.UserID, u.AccountID, u.Name, u.IdentityCard, u.Account.Role.RoleName, u.Account.StatusOfAccount }).ToList();
            List < Object > list = new List<object>();
            foreach (var item in result)
            {
                var status = "";
                var RoleName = "";
                if(item.StatusOfAccount == null)
                {
                    status = "Trống";
                }
                if(item.RoleName == null)
                {
                    RoleName = "Trống";
                }
                else
                {
                    RoleName = item.RoleName;
                }
                switch (item.StatusOfAccount)
                {
                    case 0:
                        status = "Đang hoạt động";
                        break;
                    case 1:
                        status = "Đã khóa";
                        break;
                }
                var tr = new {item.UserID, item.AccountID, item.Name, item.IdentityCard, RoleName, status, item.StatusOfAccount };
                list.Add(tr);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        // GET: Account/Details/
        public JsonResult Details(int id)
        {
            var account = db.Accounts.Find(id);
            return Json(new { account.AccountID,account.UserName,account.PassWord,account.RoleID,account.StatusOfAccount }, JsonRequestBehavior.AllowGet);
        }

        //find user and add account for user
        public JsonResult CheckUserToAdd(Account account, int UserID)
        {
            int accountID = Create(account);
            User user = db.Users.Find(UserID);
            user.AccountID = accountID;
            UpdateUser(user);
            return Json(new { user.UserID }, JsonRequestBehavior.AllowGet);
        }

        //find account to update role
        public JsonResult CheckAccToUpdateRole(int AccountID, int RoleID)
        {
            Account account = db.Accounts.Find(AccountID);
            account.RoleID = RoleID;
            Update(account);
            return Json(new { account.AccountID }, JsonRequestBehavior.AllowGet);
        }

        //find account to reset password
        public JsonResult CheckAccToResetPass(int AccountID)
        {
            Account account = db.Accounts.Find(AccountID);
            account.PassWord = "123456";
            Update(account);
            return Json(new { account.AccountID }, JsonRequestBehavior.AllowGet);
        }

        //find account to update status
        public JsonResult CheckAccToUpdateStatus(int AccountID, int Status)
        {
            Account account = db.Accounts.Find(AccountID);
            account.StatusOfAccount = Status;
            Update(account);
            return Json(new { account.StatusOfAccount }, JsonRequestBehavior.AllowGet);
        }

        //Create account
        public int Create(Account account)
        {
            if (ModelState.IsValid)
            {
                db.Accounts.Add(account);
                db.SaveChanges();
            }

            return account.AccountID;
        }

        //Update User
        public JsonResult UpdateUser(User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        //Update account
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