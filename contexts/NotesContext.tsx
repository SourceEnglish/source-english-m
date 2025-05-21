import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Platform } from 'react-native';

// Use AsyncStorage for native, localStorage for web
let storage: any = null;
if (Platform.OS === 'web') {
  storage = {
    async getItem(key: string) {
      return Promise.resolve(localStorage.getItem(key));
    },
    async setItem(key: string, value: string) {
      localStorage.setItem(key, value);
      return Promise.resolve();
    },
  };
} else {
  // Lazy import to avoid issues on web
  storage = require('@react-native-async-storage/async-storage').default;
}

interface NotesContextType {
  getNote: (key: string) => string;
  setNote: (key: string, value: string) => void;
}

const NotesContext = createContext<NotesContextType>({
  getNote: () => '',
  setNote: () => {},
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Optionally, load all notes from storage on mount
  }, []);

  const getNote = (key: string) => notes[key] || '';

  const setNote = (key: string, value: string) => {
    setNotes((prev) => ({ ...prev, [key]: value }));
    storage.setItem(`note_${key}`, value);
  };

  // Load note from storage if not in state
  const contextValue: NotesContextType = {
    getNote: (key) => {
      if (notes[key] !== undefined) return notes[key];
      storage.getItem(`note_${key}`).then((val: string | null) => {
        if (val !== null) setNotes((prev) => ({ ...prev, [key]: val }));
      });
      return '';
    },
    setNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
