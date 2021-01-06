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
    public class ManageCardController : Controller
    {
        // GET: ManageCard
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageCard
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult LoadData()
        {
            var CardNumber = from c in db.Cards select new { c.CardID,c.CardNumber,c.Status,c.Date };

            List<Object> list = new List<object>();
            foreach (var item in CardNumber)
            {
                var date = item.Date.Value.ToString("dd/MM/yyyy");
                string StatusofCard = string.Empty;
                switch (item.Status)
                {
                    case 0:
                        StatusofCard = "Chưa đăng kí";
                        break;
                    case 1:
                        StatusofCard = "Đã đăng kí";
                        break;
                    case 2:
                        StatusofCard = "Thẻ Hỏng";
                        break;
                    case 3:
                        StatusofCard = "Đã Khóa";
                        break;
                    case 4:
                        StatusofCard = "Đang sử dụng";
                        break;
                }
                var tr = new { CardID = item.CardID, CardNumber = item.CardNumber, Status = StatusofCard, Date = date};
                list.Add(tr);
            }
            var total = list.Count();
            return Json(new { dataCard = list, total}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckCardToAdd(Card card)
        {
            var check = true;
            var result = (from c in db.Cards
                          where c.CardNumber == card.CardNumber
                          select new { c.CardNumber }).FirstOrDefault();
            if(result == null)
            {
                Create(card);
                check = false;
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        public void Create(Card card)
        {
            if (ModelState.IsValid)
            {
                db.Cards.Add(card);
                db.SaveChanges();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public JsonResult CardDetails(int id)
        {
            var card = db.Cards.Find(id);
            var Status = "";

            switch (card.Status)
            {
                case 0:
                    Status = "Chưa đăng kí";
                    break;
                case 1:
                    Status = "Đã đăng kí";
                    break;
                case 2:
                    Status = "Thẻ Hỏng";
                    break;
                case 3:
                    Status = "Đã Khóa";
                    break;                
                case 4:
                    Status = "Đang sử dụng";
                    break;
            }
            var date = card.Date.Value.ToString("dd/MM/yyyy");
            var result = new { card.CardID, card.CardNumber, date, Status, StatusNumber = card.Status };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateCardByID(string idCard)
        {
            int id = Int32.Parse(idCard);
            Card result = db.Cards.AsNoTracking().Where(c => c.CardID == id).FirstOrDefault();
            Card card = new Card { CardID = result.CardID, CardNumber = result.CardNumber, Date = result.Date, Status = 1 };
            if (ModelState.IsValid)
            {
                db.Entry(card).State = EntityState.Modified;

                db.SaveChanges();
            }
            return Json(card, JsonRequestBehavior.AllowGet);
        }

        //check Card exist or not if not exist, update card
        public JsonResult CheckCardToUpdate(Card card)
        {
            var check = true;
            var result = (from c in db.Cards
                          where c.CardNumber == card.CardNumber
                          select new { c.CardNumber }).FirstOrDefault();
            var result2 = (from c in db.Cards
                           where c.CardID == card.CardID
                           select new { c.CardNumber }).FirstOrDefault();
            if (result == null || result2.CardNumber == card.CardNumber)
            {
                UpdateCard(card);
                check = false;
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateCard(Card card)
        {
            if (ModelState.IsValid)
            {
                db.Entry(card).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(card, JsonRequestBehavior.AllowGet);
        }

    }

}