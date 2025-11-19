import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Favoriten aus localStorage laden
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favoriten im localStorage speichern
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.findIndex(fav => 
        fav.title === item.title && 
        fav.path === item.path
      );
      
      if (exists !== -1) {
        // Favorit entfernen
        return prev.filter((_, index) => index !== exists);
      } else {
        // Favorit hinzufügen
        return [...prev, { ...item }];
      }
    });
  };

  const isFavorite = (item) => {
    return favorites.some(fav => 
      fav.title === item.title && 
      fav.path === item.path
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
