import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Joi from "joi-browser";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { forgetPassword } from "../services/authService";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    marginTop: "5%",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  loginBtn: {
    padding: "8px 0",
    marginTop: "5%",
  },
  errorText: {
    color: "#f44336",
  },
  loginLink: {
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function ForgotPassword() {
  const history = useHistory();

  const classes = useStyles();

  const [values, setValues] = useState({
    data: {
      email: "",
    },
    showPassword: false,
    errors: {},
  });

  // Login validation schema for Joi
  const loginSchema = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email"),
  };

  //   Validates entire form on form submit
  let validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values.data, loginSchema, options);
    const errors = {};
    if (!error) return null;

    error.details.forEach((error) => {
      errors[error.path[0]] = error.message;
    });
    return errors;
  };

  // handles login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setValues({ ...values, errors: errors || {} });
    if (errors) return;
    if (await forgetPassword(values.data)) history.push("/resetPassword");
  };

  // validates single property
  const validateProperty = ({ name, value }) => {
    const schema = { [name]: loginSchema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // handles input change
  const handleChange = ({ currentTarget: input }) => {
    const { errors, data } = values;

    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    data[input.name] = input.value;
    setValues({ ...values, data, errors });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Enter Your Email
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            {/* Email */}
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                error={!!values.errors.email}
                value={values.data.email}
                onChange={handleChange}
                aria-describedby="component-error-text"
              />
              <FormHelperText
                className={classes.errorText}
                id="component-error-text"
              >
                {values.errors.email}
              </FormHelperText>
            </FormControl>

            {/* Submit button */}
            <Button
              size="small"
              className={classes.loginBtn}
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              send code
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
