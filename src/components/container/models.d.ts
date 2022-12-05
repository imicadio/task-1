import { ElementType, ReactNode } from 'react';

export interface ContainerProps {
  container?: Boolean;
  element?: ElementType;
  customClass?: string;
  children?: ReactNode;
}
