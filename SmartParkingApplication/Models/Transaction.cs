//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SmartParkingApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Transaction
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Transaction()
        {
            this.Images = new HashSet<Image>();
        }
    
        public int TransactionID { get; set; }
        public Nullable<System.DateTime> TimeIn { get; set; }
        public Nullable<System.DateTime> TimeOutv { get; set; }
        public string LicensePlates { get; set; }
        public Nullable<int> TypeOfTicket { get; set; }
        public Nullable<int> TotalPrice { get; set; }
        public Nullable<int> CardID { get; set; }
        public Nullable<int> ParkingPlaceID { get; set; }
        public Nullable<int> TypeOfVerhicleTran { get; set; }
        public Nullable<int> UserIID { get; set; }
        public Nullable<int> UserOID { get; set; }
    
        public virtual Card Card { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Image> Images { get; set; }
        public virtual ParkingPlace ParkingPlace { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
        public virtual User User2 { get; set; }
    }
}
