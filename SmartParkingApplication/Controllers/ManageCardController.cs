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
            var CardNumber = from c in db.Cards select new { c.CardID,c.CardNumber,c.Status,c.Date };
            if (!string.IsNullOrEmpty(nameC))
            {
                CardNumber = CardNumber.Where(x => x.CardNumber.Contains(nameC));
            }
            var totalRow = CardNumber.Count();
            CardNumber = CardNumber.OrderByDescending(x => x.CardID).Skip((pageCard - 1) * pageSizeCard).Take(pageSizeCard);

            return Json(new { dataCard = CardNumber,total = totalRow}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Create(Card card)
        {
            if (ModelState.IsValid)
            {
                db.Cards.Add(card);
                db.SaveChanges();
            }

            return Json(card, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public JsonResult UpdateCard(int id)
        {
            var card = db.Cards.Find(id);
            var Status = "";
            if (card.Status == 0)
            {
                Status = "Hỏng";
            }
            if (card.Status == 1)
            {
                Status = "Đang sử dụng";
            }
            if (card.Status == 2)
            {
                Status = "Chưa sử dụng";
            }
            var result = new { card.CardID, card.CardNumber, card.Date, Status};
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }

}