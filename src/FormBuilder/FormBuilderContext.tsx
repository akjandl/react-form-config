import React from "react";

import { FormBuilderContextType } from "./index";

export const FormBuilderContext = React.createContext<FormBuilderContextType>(
  undefined as any
);
FormBuilderContext.displayName = "FormBuilderContext";

export const FormBuilderProvider = FormBuilderContext.Provider;
export const FormBuilderConsumer = FormBuilderContext.Consumer;

export function useFormBuilderContext() {
  const context = React.useContext(FormBuilderContext);

  return context;
}