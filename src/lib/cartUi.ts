export const openCart = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-cart"));
  }
};