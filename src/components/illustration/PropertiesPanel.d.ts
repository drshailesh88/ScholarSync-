import { FC } from 'react';

export interface PropertiesPanelOptions {
  target?: HTMLElement;
  onPropertyChange?: (prop: string, value: unknown) => void;
}

// The component can be used both as a class and as a React component
declare const PropertiesPanel: FC<Record<string, never>>;

export { PropertiesPanel };
export default PropertiesPanel;
