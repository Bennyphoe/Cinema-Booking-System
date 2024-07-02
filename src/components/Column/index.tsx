import { ReactNode } from "react";

export type ColumnProps<T> = {
  name: string;
  children: (datum: T) => ReactNode;
}


const Column: <
  T extends {
    // Empty
  },
>(
  props: ColumnProps<T>,
) => null = () => {
  return null
}

export default Column