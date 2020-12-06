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
    
    public partial class ParkingPlace
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParkingPlace()
        {
            this.Transactions = new HashSet<Transaction>();
            this.Users = new HashSet<User>();
        }
    
        public int ParkingPlaceID { get; set; }
        public string NameOfParking { get; set; }
        public string Location { get; set; }
        public Nullable<int> NumberOfCar { get; set; }
        public Nullable<int> NumberOfMotoBike { get; set; }
        public Nullable<int> NumberCarBlank { get; set; }
        public Nullable<int> NumberMotoBikeBlank { get; set; }
        public Nullable<int> StatusOfParkingPlace { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transaction> Transactions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    }
}
