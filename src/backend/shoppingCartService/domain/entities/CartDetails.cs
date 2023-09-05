using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using domain.dtos;
using domain.entities;

namespace Models;

public class CartDetails
{
    [Key]
    public Guid CartDetailsId { get; set; }
    public Guid CartHeaderId { get; set; }
    [ForeignKey("CartHeaderId")]
    public CartHeader CartHeader { get; set; }
    public string ProductId { get; set; }

    [NotMapped]
    public ProductDto Product { get; set; }
    public int Count { get; set; }
}