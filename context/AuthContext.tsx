"use client";
import { ProductTypes } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextTypes {
  cart: ProductTypes[];
  handleAddToCart: (product: ProductTypes, quantity: number) => void;
  handleremovecart: (product: ProductTypes) => void;
  setCart: (updatedCart: ProductTypes[]) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredProducts: ProductTypes[];
  total: number;
}

export const CartContext = createContext<CartContextTypes | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const [cart, setCart] = useState<ProductTypes[]>([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product: ProductTypes, quantity: number) => {
    const cartitems = [...cart];
    const itemExists = cartitems?.findIndex(
      (item) => item?.product?._id === product?._id
    );
    // console.log(itemExists);
    if (itemExists === -1) {
      cartitems.push({ product, quantity });
    }
    setCart(cartitems as ProductTypes[]);
    localStorage.setItem("cart", JSON.stringify(cartitems));
  };

  const handleremovecart = (product: ProductTypes) => {
    let cartitems = [...cart];
    cartitems = cartitems.filter((item) => item?.product?._id !== product?._id);
    setCart(cartitems as ProductTypes[]);
    localStorage.setItem("cart", JSON.stringify(cartitems));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")!) || [];
    setCart(storedCart as ProductTypes[]);
  }, []);

  const [products, setProducts] = useState<ProductTypes[]>([]);

  const getAllProducts = async () => {
    try {
      const res = await fetch(`/api/access-products`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "") {
      setFilteredProducts([]);
    } else {
      let filtered = products?.filter((currElem) => {
        return currElem?.title
          ?.toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      });
      setFilteredProducts(filtered);
    }
  };

  const handleTotal = () => {
    let totalPrice = 0;
    cart?.forEach((item) => {
      const { product, quantity } = item;
      let productPrice = product?.price;
      totalPrice += productPrice! * quantity!;
    });
    setTotal(totalPrice);
  };

  useEffect(() => {
    handleTotal();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        total,
        cart,
        handleAddToCart,
        handleremovecart,
        setCart,
        handleSearch,
        filteredProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
