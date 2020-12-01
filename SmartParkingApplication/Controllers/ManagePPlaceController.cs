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
            return View();
        }

        public JsonResult LoadDataStatusPP(int pageSPP, String nameSSP, int pageSizeSPP = 5)
        {
            var trans = from t in db.Transactions
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.CardID
                        select new { t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber };
            if (!string.IsNullOrEmpty(nameSSP))
            {
                trans = trans.Where(x => x.LicensePlates.Contains(nameSSP));
            }
            var totalRow = trans.Count();
            trans = trans.Skip((pageSPP - 1) * pageSizeSPP).Take(pageSizeSPP);
            return Json(new { dataSSP = trans, total = totalRow }, JsonRequestBehavior.AllowGet);
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