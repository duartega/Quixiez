import React from "react";
import Header from "components/Theme/Header/Header";
import HeaderLinks from "../../components/Theme/Header/HeaderLinks";
import Table from "components/Theme/Table/Table";
import { Grid } from "@material-ui/core";
import messagePageStyle from "./messagePageStyle";
import Badge from "components/Theme/Badge/Badge";
import Card from "components/Theme/Card/Card";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Button from "components/Theme/CustomButtons/Button";

interface Props extends WithStyles<typeof messagePageStyle> {}

const badge = {
  orange: <Badge color="warning">Constructing Order</Badge>,
  red: <Badge color="danger">No Docs</Badge>
};

const button = {
  std: (
    <Button type="button" color="primary" href="/message" size="sm">
      View
    </Button>
  )
};

class MessagePage extends React.Component<Props, any> {
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
                tableHead={[
                  "Id",
                  "Name",
                  "Message Preview",
                  "Status",
                  "Actions"
                ]}
                tableData={[
                  ["393939", "Alexis", "Im Alexis!", badge.orange, button.std],
                  ["20", "Jake", "Im Jake", badge.red]
                ]}
                customHeadClassesForCells={[0, 1, 2, 3, 4]}
                customHeadCellClasses={[
                  classes.container,
                  classes.container,
                  classes.container,
                  classes.container,
                  classes.container
                ]}
                customClassesForCells={[0, 1, 2, 3, 4]}
                customCellClasses={[
                  classes.container,
                  classes.container,
                  classes.container,
                  classes.container,
                  classes.container
                ]}
              />
            </Card>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(messagePageStyle)(MessagePage);
