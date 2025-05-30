package com.sistema.pawgps.servicios;

import com.sistema.pawgps.modelo.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> getCartItems(Long userId);
    CartItem addToCart(Long userId, Long productId, int quantity);
    void removeFromCart(Long cartItemId);
    void clearCart(Long userId);
}