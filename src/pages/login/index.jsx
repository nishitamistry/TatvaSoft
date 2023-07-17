import { loginStyle } from "./style";
import {
  Breadcrumbs,
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../State/Slice/authSlice"; 

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = useSelector(state => state.auth.user);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email is required"),
    password: Yup.string().min(5, "Password must be more than 5 characters").required("Password is required."),
  });

  const classes = loginStyle();

  const onSubmit = (data) => {
    authService.login(data).then((res) => {
      toast.success("Login successfully");
      dispatch(setUser(res));
      
    }).then(resp=>{
      navigate("/");
    }
      )
  };

  return (
    <div className={classes.loginWrapper}>
      <div className="login-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography color="textPrimary">Login</Typography>
          </Breadcrumbs>
          <Typography variant="h1">Login or Create an Account</Typography>
          <div className="login-row">
            <div className="content-col">
              <div className="top-content">
                <Typography variant="h2">New Customer</Typography>
                <p>Registration is free and easy.</p>
                <List className="bullet-list">
                  <ListItem>Faster checkout</ListItem>
                  <ListItem>Save multiple shipping addresses</ListItem>
                  <ListItem>View and track orders and more</ListItem>
                </List>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account
                </Button>
              </div>
            </div>
            <div className="form-block">
              <Typography variant="h2">Registered Customers</Typography>
              <p>If you have an account with us, please log in.</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                    <div className="form-row-wrapper">
                      <div className="form-col">
                        <TextField
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          label="Email Address *"
                          autoComplete="off"
                          variant="outlined"
                          inputProps={{ className: "small" }}
                        />
                      </div>
                      <div className="form-col">
                        <TextField
                          id="password"
                          name="password"
                          label="Password *"
                          type="password"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          inputProps={{ className: "small" }}
                          autoComplete="off"
                        />
                        <ValidationErrorMessage
                          message={errors.password}
                          touched={touched.password}
                        />
                      </div>
                      <div className="btn-wrapper">
                        <Button
                          type="submit"
                          className="pink-btn btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};