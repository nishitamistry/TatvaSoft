import React from "react";
import { createAccountStyle } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../State/Slice/authSlice";
import {
  Breadcrumbs,
  Link,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/index";
import authService from "../../service/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import useValidation from "../../customhooks/useValidation";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = createAccountStyle();
  const materialClasses = materialCommonStyles();
  const user = useSelector((state) => state.auth.user);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    password: "",
    confirmPassword: "",
  };

  const roleList = [
    { id: 3, name: "buyer" },
    { id: 2, name: "seller" },
  ];
useValidation();
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Invalid email address format")
  //     .required("Email is required"),
  //   password: Yup.string()
  //     .min(5, "Password must be 5 characters at minimum")
  //     .required("Password is required"),
  //   confirmPassword: Yup.string()
  //     .oneOf(
  //       [Yup.ref("password"), null],
  //       "Password and Confirm Password must match."
  //     )
  //     .required("Confirm Password is required."),
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   roleId: Yup.number().required("Role is required"),
  // });

  const onSubmit = (data) => {
    delete data.confirmPassword;
    authService.create(data).then((res) => {
      dispatch(setUser(res));
      navigate("/login");
      toast.success("Successfully registered");
    });
  };

  return (
    <div className={classes.createAccountWrapper}>
      <div className="create-account-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Create an Account</Typography>
          </Breadcrumbs>

          <Typography variant="h1">Login or Create an Account</Typography>
          <div className="create-account-row">
            <Formik
              initialValues={initialValues}
              validationSchema={useValidation()}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-block">
                    <div className="personal-information">
                      <Typography variant="h2">Personal Information</Typography>
                      <p>
                        Please enter the following information to create your
                        account.
                      </p>
                      <div className="form-row-wrapper">
                        <div className="form-col">
                          <TextField
                            id="first-name"
                            name="firstName"
                            type="text"
                            label="First Name *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <ValidationErrorMessage
                            message={errors.firstName}
                            touched={touched.firstName}
                          />
                        </div>
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            id="last-name"
                            name="lastName"
                            type="text"
                            label="Last Name *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onChange={handleChange}
                          />
                          <ValidationErrorMessage
                            message={errors.lastName}
                            touched={touched.lastName}
                          />
                        </div>
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onChange={handleChange}
                          />
                          <ValidationErrorMessage
                            message={errors.email}
                            touched={touched.email}
                          />
                        </div>
                        <div className="form-col">
                          <FormControl
                            className="dropdown-wrapper"
                            variant="outlined"
                          >
                            <InputLabel htmlFor="select">Roles</InputLabel>
                            <Select
                              name="roleId"
                              id={"roleId"}
                              inputProps={{ className: "small" }}
                              className={materialClasses.customSelect}
                              MenuProps={{
                                classes: {
                                  paper: materialClasses.customSelect,
                                },
                              }}
                              onChange={handleChange}
                            >
                              {roleList.length > 0 &&
                                roleList.map((Role) => (
                                  <MenuItem
                                    value={Role.id}
                                    key={"name" + Role.id}
                                  >
                                    {Role.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="login-information">
                      <Typography variant="h2">Login Information</Typography>

                      <div className="form-row-wrapper">
                        <div className="form-col">
                          <TextField
                            onBlur={handleBlur}
                            id="password"
                            type="password"
                            name="password"
                            label="Password *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onChange={handleChange}
                          />
                          <ValidationErrorMessage
                            message={errors.password}
                            touched={touched.password}
                          />
                        </div>
                        <div className="form-col">
                          <TextField
                            type="password"
                            onBlur={handleBlur}
                            id="confirm-password"
                            name="confirmPassword"
                            label="Confirm Password *"
                            variant="outlined"
                            inputProps={{ className: "small" }}
                            onChange={handleChange}
                          />
                          <ValidationErrorMessage
                            message={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                        </div>
                      </div>
                      <div className="btn-wrapper">
                        <Button
                          className="pink-btn btn"
                          variant="contained"
                          type="submit"
                          color="primary"
                          disableElevation
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
