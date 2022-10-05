import { createContext } from "react";

export type GoUploadContextProps = {
  isInIframe: boolean;
  cols: number;
};
export const GoUploadContext = createContext<GoUploadContextProps>(
  undefined as unknown as GoUploadContextProps
);
