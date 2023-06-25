import React, {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from 'react';

interface UIContextState {
  isDark: boolean;
  toggleDark: () => void;
}

const contextDefaultValues: UIContextState = {
  isDark: false,
  toggleDark: () => {},
};

export const UIContext = createContext<UIContextState>(contextDefaultValues);
const { Provider, Consumer } = UIContext;

type UIProviderProps = {
  children: ReactNode;
};

const UIProvider = ({ children }: UIProviderProps) => {
  const [dark, setDark] = useState(false);

  const toggleDark = useCallback(() => {
    setDark(!dark);
  }, [dark]);

  return (
    <Provider
      value={{
        isDark: dark,
        toggleDark,
      }}
    >
      {children}
    </Provider>
  );
};

const useUIContext = () => {
  const ctx = useContext(UIContext);
  if (ctx === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return ctx;
};

export default UIContext;
export { UIProvider, Consumer as UIConsumer, useUIContext };
