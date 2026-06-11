import { createContext, useContext, useState, useEffect } from "react";

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const salvo = localStorage.getItem("codetask-items");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("codetask-items", JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function updateItem(itemAtualizado) {
    setItems((prev) =>
      prev.map((item) => (item.id === itemAtualizado.id ? itemAtualizado : item))
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}