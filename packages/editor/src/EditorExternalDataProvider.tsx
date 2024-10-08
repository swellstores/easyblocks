import { ExternalData } from "@swell/easyblocks-core";
import React, { createContext, ReactNode, useContext, memo } from "react";

const ExternalDataContext = createContext<ExternalData>({});

interface EditorExternalDataProviderProps {
  children: ReactNode;
  externalData: ExternalData;
}

const EditorExternalDataProvider = memo(
  ({ children, externalData }: EditorExternalDataProviderProps) => {
    return (
      <ExternalDataContext.Provider value={externalData}>
        {children}
      </ExternalDataContext.Provider>
    );
  }
);

function useEditorExternalData() {
  return useContext(ExternalDataContext);
}

export { EditorExternalDataProvider, useEditorExternalData };
