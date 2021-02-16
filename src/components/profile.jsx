import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Joi from "joi-browser";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";

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
  registerBtn: {
    padding: "8px 0",
    marginTop: "5%",
  },
  errorText: {
    color: "#f44336",
  },
}));

export default function Profile() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    data: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
  });

  const registerSchema = {
    username: Joi.string().required().min(3).label("Username"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    confirmPassword: Joi.string().required().min(5).label("Confirm Password"),
  };

  let validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(values.data, registerSchema, options);

    const errors = {};

    if (!error) return null;

    error.details.forEach((error) => {
      errors[error.path[0]] = error.message;
    });

    return errors;
  };

  // handles resgister form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setValues({ ...values, errors: errors || {} });
    if (errors) return;

    // Call the server...
  };

  const validateProperty = ({ name, value }) => {
    const schema = { [name]: registerSchema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const { errors, data } = values;

    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    data[input.name] = input.value;
    setValues({ ...values, data, errors });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Profile
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          {/* Username */}
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              error={!!values.errors.username}
              value={values.data.username}
              onChange={handleChange}
              aria-describedby="component-error-text"
            />
            <FormHelperText
              className={classes.errorText}
              id="component-error-text"
            >
              {values.errors.username}
            </FormHelperText>
          </FormControl>

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

          {/* Password */}
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              error={!!values.errors.password}
              type={values.showPassword ? "text" : "password"}
              value={values.data.password}
              onChange={handleChange}
              aria-describedby="component-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              className={classes.errorText}
              id="component-error-text"
            >
              {values.errors.password}
            </FormHelperText>
          </FormControl>

          {/* Register Button */}
          <Button
            size="small"
            className={classes.registerBtn}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
