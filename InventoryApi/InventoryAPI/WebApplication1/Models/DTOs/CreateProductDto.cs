﻿namespace InventoryApi.Models.DTOs
{
    public class CreateProductDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public string? Category { get; set; }
    }
}
