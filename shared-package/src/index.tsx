import { PropsWithChildren, createContext, useContext } from 'react';

export type SharedContextType = {
  count: number;
  setCount: (count: number) => void;
};

export const SharedContext = createContext<SharedContextType>({
  count: 0,
  setCount: () => {},
});

export const useCount = () => {
  const { count } = useContext(SharedContext);
  return count;
};

export const useIncrement = () => {
  const { count, setCount } = useContext(SharedContext);
  return () => setCount(count + 1);
};

export const useDecrement = () => {
  const { count, setCount } = useContext(SharedContext);
  return () => setCount(count - 1);
};

export const SharedProvider = ({
  children,
  count,
  setCount,
}: PropsWithChildren<SharedContextType>) => {
  return (
    <SharedContext.Provider value={{ count, setCount }}>
      {children}
    </SharedContext.Provider>
  );
};
