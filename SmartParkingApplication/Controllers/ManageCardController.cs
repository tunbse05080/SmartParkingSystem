using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageCardController : Controller
    {
        // GET: ManageCard
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageCard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult LoadData(string nameC,int pageCard,int pageSizeCard = 5)
        {
            var CardNumber = from c in db.Cards select new { c.CardID,c.CardNumber,c.Status };
            if (!string.IsNullOrEmpty(nameC))
            {
                CardNumber = CardNumber.Where(x => x.CardNumber.Contains(nameC));
            }
            var totalRow = CardNumber.Count();
            CardNumber = CardNumber.OrderByDescending(x => x.CardID).Skip((pageCard - 1) * pageSizeCard).Take(pageSizeCard);

            return Json(new { dataCard = CardNumber,total = totalRow}, JsonRequestBehavior.AllowGet);
        }
    }
}