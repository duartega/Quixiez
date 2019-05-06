import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import ContainerStyle from "./ContainerStyle";

interface Props extends WithStyles<typeof ContainerStyle> {
  children?: React.ReactChildren | React.ReactChild;
  style?: React.CSSProperties | undefined;
}

const Container: React.FC<Props> = props => {
  const { children, classes, style } = props;
  return (
    <div className={classes.container} style={style}>
      {children}
    </div>
  );
};

export default withStyles(ContainerStyle)(Container);
