﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ErrorPageController : Controller
    {
        // GET: ErrorPage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ErrorPageLogin()
        {
            return View();
        }

        public ActionResult ErrorPageLogout()
        {
            return View();
        }

    }
}