import React, { FC } from "react";
import classNames from "classnames";
import { ContainerProps } from "./models";

const Container: FC<ContainerProps> = ({ element, children, customClass, container }) => {
  const returnClassNames = classNames(customClass, {
    ['container']: container,
  });

  const Tag = element || "div";

  return <Tag className={returnClassNames}>{children}</Tag>;
};

export default Container;
