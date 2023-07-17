import * as Yup from "yup";
const useValidation = () =>{

     const   validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be 5 characters at minimum")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Password and Confirm Password must match."
        )
        .required("Confirm Password is required."),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      roleId: Yup.number().required("Role is required"),
    });
  
  
}
export default useValidation;
