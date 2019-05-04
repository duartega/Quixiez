import React from "react";
import Header from "components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Table from "components/Table/Table";
import { Grid } from "@material-ui/core";
import messagePageStyle from "./messagePageStyle";
import Badge from "components/Badge/Badge";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles(messagePageStyle);

interface Props extends WithStyles<typeof styles> {}

const badge = {
  orange: <Badge color="warning">Orange</Badge>,
  red: <Badge color="danger">Red</Badge>
};

class MessagePage extends React.Component<WithStyles<typeof styles>, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header
          brand="Messages"
          links={<HeaderLinks dropdownHoverColor="info" />}
          color="dark"
          changeColorOnScroll={{
            height: 400,
            color: "info"
          }}
        />
        <Grid container direction="row" alignItems="center" justify="center">
          <div className={classes.tableContainer}>
            <Card>
              <Table
                //   tableHead={["Id", "Name"]}
                tableData={[
                  ["393939", "Alexis", badge.orange],
                  ["20", "Jake", badge.red]
                ]}
                customCellClasses={[classes.container]}
                customClassesForCells={[0, 1, 2]}
              />
            </Card>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MessagePage);
