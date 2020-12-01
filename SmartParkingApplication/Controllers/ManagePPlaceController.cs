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
    public class ManagePPlaceController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageParkingPlace
        public ActionResult ManageStatusParkingPlace()
        {
            var trans = (from t in db.Transactions orderby t.TimeIn select t).ToList();
            ViewBag.transac = trans;

            return View();
        }
        public JsonResult LoadData(int page, String name, int pageSize = 5)
        {
            var trans = from t in db.Transactions
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.TimeIn
                        select new { t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber, t.ParkingPlace };
           
            var totalRow = trans.Count();
            trans = trans.Skip((page - 1) * pageSize).Take(pageSize);

            return Json(new { data = trans, total = totalRow }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details(int id)
        {
            var trans = db.Transactions.Find(id);

            var TypeOfTicket = "";
            if (trans.TypeOfTicket == 0)
            {
                TypeOfTicket = "Vé Tháng";
            }
            else
            {
                TypeOfTicket = "Vé Lượt";
            }
            var TimeIn = trans.TimeIn.Value.ToString();
            var Timeout = trans.TimeOutv.Value.ToString();
            
            
           // var contractSigningDate = employee.ContractSigningDate.Value.ToString("dd/MM/yyyy");
           // var contractExpirationDate = employee.ContractExpirationDate.Value.ToString("dd/MM/yyyy");
            var result = new { trans.LicensePlates,TimeIn, Timeout, trans.TypeOfTicket, trans.Card.CardNumber, trans.ParkingPlace };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListParkingPlace()
        {
            var listParking = (from list in db.ParkingPlaces select list).ToList();
            return View(listParking);
        }

        // GET: ParkingPlaces/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ParkingPlaces/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ParkingPlaceID,NameOfParking,Location,NumberOfSlot,NumberOfCar,NumberOfMotoBike,NumberCarBlank,NumberMotoBikeBlank")] ParkingPlace parkingPlace)
        {
            if (ModelState.IsValid)
            {
                db.ParkingPlaces.Add(parkingPlace);
                db.SaveChanges();
                return RedirectToAction("ListParkingPlace");
            }

            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // POST: ParkingPlaces/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ParkingPlaceID,NameOfParking,Location,NumberOfSlot,NumberOfCar,NumberOfMotoBike,NumberCarBlank,NumberMotoBikeBlank")] ParkingPlace parkingPlace)
        {
            if (ModelState.IsValid)
            {
                db.Entry(parkingPlace).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("ListParkingPlace");
            }
            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // POST: ParkingPlaces/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            db.ParkingPlaces.Remove(parkingPlace);
            db.SaveChanges();
            return RedirectToAction("ListParkingPlace");
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