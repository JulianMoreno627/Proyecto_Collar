package com.sistema.pawgps.servicios.impl;

import com.sistema.pawgps.modelo.CartItem;
import com.sistema.pawgps.modelo.Product;
import com.sistema.pawgps.repositorios.CartItemRepository;
import com.sistema.pawgps.repositorios.ProductRepository;
import com.sistema.pawgps.servicios.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<CartItem> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @Override
    public CartItem addToCart(Long userId, Long productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(new CartItem());

        cartItem.setProduct(product);
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItem.setUserId(userId);

        return cartItemRepository.save(cartItem);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}