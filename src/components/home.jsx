import React from "react";
import Tests from "./common/tests";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "gray",
    height: "25rem",
    width: "30rem",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      {" "}
      <Tests />{" "}
    </div>
  );
}
