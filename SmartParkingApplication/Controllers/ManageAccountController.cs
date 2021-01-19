using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    //[Authorize(Roles ="Admin")]
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
            List<Object> list = new List<object>();
            try
            {
                var result = (from u in db.Users
                              select new { u.UserID, u.AccountID, u.Name, u.IdentityCard, u.Account.Role.RoleName, u.Account.StatusOfAccount }).ToList();

                foreach (var item in result)
                {
                    var status = "";
                    var RoleName = "";
                    if (item.StatusOfAccount == null)
                    {
                        status = "Trống";
                    }
                    if (item.RoleName == null)
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
                    var tr = new { item.UserID, item.AccountID, item.Name, item.IdentityCard, RoleName, status, item.StatusOfAccount };
                    list.Add(tr);
                }
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //// GET: Account/Details/
        //public JsonResult Details(int id)
        //{
        //    try
        //    {
        //        var account = db.Accounts.Find(id);
        //        return Json(new { account.AccountID, account.UserName, account.PassWord, account.RoleID, account.StatusOfAccount }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception)
        //    {
        //        return Json("LoadFalse", JsonRequestBehavior.AllowGet);
        //    }
        //}

        //check username exist or not if exist find user and add account for user
        public JsonResult CheckUserToAdd(Account account, int UserID)
        {
            try
            {
                var check = true;
                var result = (from a in db.Accounts
                              where a.UserName.ToLower().Equals(account.UserName.ToLower())
                              select new { a.UserName }).FirstOrDefault();
                if (result == null)
                {
                    int accountID = Create(account);
                    User user = db.Users.Find(UserID);
                    user.AccountID = accountID;
                    user.StatusOfwork = 1;
                    UpdateUser(user);
                    check = false;
                }
                return Json(check, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //find account to update role
        public JsonResult CheckAccToUpdateRole(int AccountID, int RoleID)
        {
            try
            {
                Account account = db.Accounts.Find(AccountID);
                account.RoleID = RoleID;
                Update(account);
                return Json(new { account.AccountID }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }
        }

        //find account to reset password
        public JsonResult CheckAccToResetPass(int AccountID, string Password)
        {
            try
            {
                Account account = db.Accounts.Find(AccountID);
                account.PassWord = Password;
                Update(account);
                return Json(new { account.AccountID }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //find account to update status
        public JsonResult CheckAccToUpdateStatus(int AccountID, int Status)
        {
            try
            {
                Account account = db.Accounts.Find(AccountID);
                account.StatusOfAccount = Status;
                Update(account);
                return Json(new { account.StatusOfAccount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }

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

        public JsonResult checkUserNameExist(string UserNameAcc)
        {
            var result = (from a in db.Accounts
                          where a.UserName.ToLower().Equals(UserNameAcc.ToLower())
                          select new { a.UserName }).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}