import { useState } from "react";
import { toast } from "react-toastify";

const CART_KEY = "cart_items";

function getCartFromStorage(): CartItem[] {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(getCartFromStorage());
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    toast.success(`${item.title} a été ajoutée au panier`);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    toast.success("L'article a bien été retiré du panier");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  return { cart, addToCart, removeFromCart, clearCart, total };
}
