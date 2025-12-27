'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedImage?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number, selectedImage?: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    getWhatsAppLink: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { toast } = useToast();

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('eikocolors-cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage', e);
            }
        }
    }, []);

    // Save to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('eikocolors-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, quantity = 1, selectedImage?: string) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity, selectedImage }];
        });
        toast({
            title: "Producto agregado",
            description: `${product.name} se ha agregado al carrito.`,
        })
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getWhatsAppLink = () => {
        const phoneNumber = "5215512345678"; // Reemplaza con el número real de WhatsApp (con lada)
        let message = "Hola, me gustaría cotizar los siguientes productos de tu tienda web:\n\n";

        cartItems.forEach((item) => {
            message += `- ${item.product.name} (x${item.quantity})\n`;
            if (item.selectedImage) {
                message += `  Ref Imagen: ${item.selectedImage}\n`;
            }
        });

        message += "\n¡Gracias!";

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                getWhatsAppLink,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
