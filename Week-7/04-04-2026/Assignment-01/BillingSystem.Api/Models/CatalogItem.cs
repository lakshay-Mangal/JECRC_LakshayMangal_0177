// Models/CatalogItem.cs
public class CatalogItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CatalogCategory { get; set; } = string.Empty; // "Entrance", "Donation", "SellingPrice"
    public decimal DefaultPrice { get; set; }
    public bool IsVariablePrice { get; set; } // True for custom donations or open items
}

// Models/Bill.cs
public class Bill
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public decimal SubTotal { get; set; }
    public decimal DiscountAmount { get; set; } // Flat amount or calculated from percentage
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    
    public List<BillItem> Items { get; set; } = new();
}

// Models/BillItem.cs
public class BillItem
{
    public int Id { get; set; }
    public int BillId { get; set; }
    public string Description { get; set; } = string.Empty; // Allows for custom items not in DB
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}