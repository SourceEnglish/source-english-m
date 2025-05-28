import React, { createContext, useContext, useRef } from 'react';

type DeckContextType = {
  deckEntries: string[] | null;
  setDeckEntries: (entries: string[] | null) => void;
  deckIndex: number | null;
  setDeckIndex: (idx: number | null) => void;
};

const DeckContext = createContext<DeckContextType>({
  deckEntries: null,
  setDeckEntries: () => {},
  deckIndex: null,
  setDeckIndex: () => {},
});

export const useDeck = () => useContext(DeckContext);

export const useDeckEntries = () => useContext(DeckContext).deckEntries;
export const useDeckIndex = () => useContext(DeckContext).deckIndex;

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deckEntriesRef = useRef<string[] | null>(null);
  const deckIndexRef = useRef<number | null>(null);

  const setDeckEntries = (entries: string[] | null) => {
    deckEntriesRef.current = entries;
  };

  const setDeckIndex = (idx: number | null) => {
    deckIndexRef.current = idx;
  };

  return (
    <DeckContext.Provider
      value={{
        get deckEntries() {
          return deckEntriesRef.current;
        },
        setDeckEntries,
        get deckIndex() {
          return deckIndexRef.current;
        },
        setDeckIndex,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
