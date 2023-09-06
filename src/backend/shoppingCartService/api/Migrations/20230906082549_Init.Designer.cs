﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using infrastructure;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20230906082549_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Models.CartDetails", b =>
                {
                    b.Property<Guid>("CartDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CartHeaderId")
                        .HasColumnType("char(36)");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<string>("ProductId")
                        .HasColumnType("longtext");

                    b.HasKey("CartDetailsId");

                    b.HasIndex("CartHeaderId");

                    b.ToTable("CartDetails");
                });

            modelBuilder.Entity("domain.entities.CartHeader", b =>
                {
                    b.Property<Guid>("CartHeaderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CouponCode")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("CartHeaderId");

                    b.ToTable("CartHeaders");
                });

            modelBuilder.Entity("Models.CartDetails", b =>
                {
                    b.HasOne("domain.entities.CartHeader", "CartHeader")
                        .WithMany()
                        .HasForeignKey("CartHeaderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CartHeader");
                });
#pragma warning restore 612, 618
        }
    }
}
