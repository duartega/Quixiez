import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import ContainerStyle from "./ContainerStyle";
import classNames from "classnames";

interface Props extends WithStyles<typeof ContainerStyle> {
  children?: React.ReactChildren | React.ReactChild;
  style?: React.CSSProperties;
  classNamesProps?: string[];
}

const Container: React.FC<Props> = props => {
  const { children, classes, style, classNamesProps } = props;
  let _classNames = classNamesProps
    ? classNames([classes.container, ...classNamesProps])
    : classes.container;
  return (
    <div className={_classNames} style={style}>
      {children}
    </div>
  );
};

export default withStyles(ContainerStyle)(Container);
