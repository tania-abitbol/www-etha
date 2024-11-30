import React, { useEffect, useState } from "react";
import {
  getCheckout,
  updateLineItemQuantity,
  deleteLineItem,
} from "~/api/checkout";
import { trackEvent } from "~/utils/firebase";

import { ThreeDScene } from "./CardBox";

interface CartModalProps {
  isOpen: boolean;
  checkoutId: string;
  checkoutUrl: string;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  checkoutId,
  checkoutUrl,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const checkout = await getCheckout(checkoutId);
      const items = checkout.lineItems.edges.map((edge: any) => edge.node);
      setCartItems(items);
      setSubtotal(checkout.subtotalPriceV2.amount);

      if (items.length === 0) {
        trackEvent("cart_empty", { checkoutId });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des articles du panier :",
        error
      );
    }
  };

  const handleDeleteItem = async (lineItemId: string) => {
    try {
      const updatedCheckout = await deleteLineItem(checkoutId, lineItemId);
      const updatedItems = updatedCheckout.lineItems.edges.map(
        (edge: any) => edge.node
      );
      setCartItems(updatedItems);
      setSubtotal(updatedCheckout.subtotalPriceV2.amount);

      trackEvent("cart_item_deleted", {
        checkoutId,
        lineItemId,
      });
    } catch (error) {
      trackEvent("cart_item_delete_error", {
        checkoutId,
        lineItemId,
        error: error,
      });
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  const handleQuantityChange = async (
    lineItemId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      const updatedCheckout = await updateLineItemQuantity(
        checkoutId,
        lineItemId,
        newQuantity
      );
      const updatedItems = updatedCheckout.lineItems.edges.map(
        (edge: any) => edge.node
      );
      setCartItems(updatedItems);
      setSubtotal(updatedCheckout.subtotalPriceV2.amount);

      trackEvent("cart_item_quantity_updated", {
        checkoutId,
        lineItemId,
        newQuantity,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité :", error);
      trackEvent("cart_item_quantity_update_error", {
        checkoutId,
        lineItemId,
        newQuantity,
        error: error,
      });
    }
  };

  const handleCheckout = () => {
    if (checkoutUrl) {
      trackEvent("cart_checkout_continue", { checkoutId, subtotal });
      window.location.href = checkoutUrl;
    } else {
      console.error("URL du checkout manquante");
      trackEvent("cart_checkout_missing_url", { checkoutId });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen, checkoutId]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      <div
        className={`relative bg-gray-900 bg-opacity-98 w-full max-w-sm md:max-w-md lg:max-w-[450px] h-[calc(100%-2rem)] sm:h-[calc(100%-4rem)] ml-4 sm:ml-0 mt-4 sm:mt-8 mb-4 sm:mb-8 mr-4 sm:mr-8 rounded-3xl shadow-lg flex flex-col transition-transform duration-300 ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 pt-12 pb-4 border-b border-gray-800">
          <h2 className="text-white text-lg font-semibold">Panier</h2>
          <button
            className="text-white hover:text-gray-400 transition-all"
            onClick={onClose}
          >
            <img src="/images/cross.svg" alt="" className="w-8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <p className="text-lg font-medium">Votre panier est vide.</p>
              <p className="text-sm mt-2">
                Ajoutez des articles pour continuer.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 mb-4"
              >
                <ThreeDScene state={item.title === "Bae" ? "bae" : "vouv"} />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.variant.priceV2.amount} €
                  </p>
                </div>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="bg-gray-700 text-white font-medium rounded-md px-3 py-2 outline-none transition-all cursor-pointer pr-8 relative appearance-none"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1rem",
                  }}
                >
                  {[...Array.from(Array(10).keys())].map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>

                <button
                  className="ml-auto border-solid border border-gray-600 rounded-md p-1 hover:bg-gray-700 transition-all bg-gray-700"
                  aria-label="Supprimer"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <img src="/images/trash.svg" alt="" className="w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-8 pt-4 pb-12 border-t border-gray-800">
            <div className="flex justify-between items-center text-white font-semibold mb-4">
              <span>Total</span>
              <span>{subtotal} €</span>
            </div>
            <button
              className="w-full bg-white text-gray-800 font-semibold py-3 rounded-md hover:bg-gray-100 transition-all"
              onClick={handleCheckout}
            >
              Continuer →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
