package com.sistema.pawgps.modelo;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cart_items")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    private Long userId; // ID del usuario que agregó el item

    // Getters and setters (omitidos por @Data de Lombok)
}