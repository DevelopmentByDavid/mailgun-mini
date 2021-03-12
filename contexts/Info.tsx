import React from "react";

interface MgInfo {
  apiKey: string;
  domain: string;
}

export const InfoContext = React.createContext<MgInfo | null>(null);
export const SetInfoContext = React.createContext<React.Dispatch<
  React.SetStateAction<MgInfo>
> | null>(null);

export default function Info({ children }: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<MgInfo>({ apiKey: "", domain: "" });
  return (
    <InfoContext.Provider value={state}>
      <SetInfoContext.Provider value={setState}>
        {children}
      </SetInfoContext.Provider>
    </InfoContext.Provider>
  );
}
