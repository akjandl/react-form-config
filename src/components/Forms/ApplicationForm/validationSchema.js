import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  streetAddr: Yup.string().required("Required").min(5, "Min 5 characters"),
  city: Yup.string().required("Required").min(5, "Min 5 characters"),
  state: Yup.string().required("Required").min(2, "Use 2 characters").max(2, "Use 2 characters"),
});
