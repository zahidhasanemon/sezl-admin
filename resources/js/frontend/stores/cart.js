import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),
  getters: {
    count: (state) => state.items.length,
  },
  actions: {
    loadFromLocalStorage() {
      this.items = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    addItem(item) {
      const existing = this.items.find(
        (c) =>
          c.product_id === item.product_id &&
          c.variation_id === item.variation_id
      );
      if (existing) {
        existing.quantity += item.quantity;
        existing.total_price = (
          existing.quantity * existing.final_price
        ).toFixed(2);
      } else {
        this.items.push(item);
      }
      this.saveToLocalStorage();
    },
    updateItemQuantity(id, quantity) {
      const item = this.items.find((c) => c.id === id);
      if (item) {
        item.quantity = quantity;
        item.total_price = (quantity * item.final_price).toFixed(2);
        this.saveToLocalStorage();
      }
    },
    removeItem(id) {
      this.items = this.items.filter((c) => c.id !== id);
      this.saveToLocalStorage();
    },
    removeAllItems() {
      this.items = [];
      this.saveToLocalStorage();
    },
  },
});
