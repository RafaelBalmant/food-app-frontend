import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { MenuContainer } from "./styles";
import { primaryColors } from "../../../helpers/colors.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  item: {
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  location: {
    justifyContent: "end",
  },
  logo: {
    justifyContent: "center",
    fontSize: "2em",
    color: primaryColors.second,
  },
  menu: {
    justifyContent: "end",
  },
}));

function Menu({ children }) {
  const classes = useStyles();

  return (
    <>
      <MenuContainer maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3} className={[classes.item, classes.location]}>
              <h5>Buscando a partir de</h5>
              <h2>Ibirarema</h2>
              <h6>Mudar Localização</h6>
            </Grid>
            <Grid item xs={6} className={[classes.item, classes.logo]}>
              <h1>FOOD APP</h1>
            </Grid>
            <Grid item xs={3} className={[classes.item, classes.menu]}>
              <h3>Catálogo</h3>
            </Grid>
          </Grid>
        </div>
      </MenuContainer>
      {children}
    </>
  );
}

Menu.propTypes = {
  children: PropTypes.element,
};

Menu.defaultProps = {
  children: null,
};

export default Menu;
