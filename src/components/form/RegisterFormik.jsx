import React from "react";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import InputFormik from "../input/InputFormik";
import RadioFormik from "../radio/RadioFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";
import DropdownFormik from "../dropdown/DropdownFormik";

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        gender: "Male",
        job: "",
        terms: false,
      }}
      validationSchema={yup.object({
        userName: yup.string().required("Please enter your user name"),
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
        password: yup
          .string()
          .min(8, "Your password must be at least 8 characters long")
          .matches(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            {
              message:
                "Your password must have at 8 characters, 1 upperCase, 1 lowerCase, 1 special characters",
            }
          )
          .required("Please enter your password"),
        gender: yup
          .string()
          .required("Please select your gender")
          .oneOf(["Male", "Female"], "You can male or female"),
        job: yup.string().required("Please select your job"),
        terms: yup
          .boolean()
          .oneOf([true], "Please checkbox of terms conditions"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
          resetForm();
        }, 5000);
      }}
    >
      {(formik) => {
        const watchGender = formik.values.gender;
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-[300px] mx-auto my-10"
            autoComplete="off"
          >
            <InputFormik
              name="userName"
              placeholder="Enter your user name"
              id="userName"
              label="User name"
              type="text"
            ></InputFormik>
            <InputFormik
              name="email"
              placeholder="Enter your email"
              id="email"
              label="Email address"
              type="email"
            ></InputFormik>
            <InputFormik
              name="password"
              placeholder="Enter your password"
              id="password"
              label="Password"
              type="password"
            ></InputFormik>
            <div className="flex flex-col gap-3 mb-5">
              <label className="cursor-pointer">Gender</label>
              <div className="flex items-center gap-5">
                <RadioFormik
                  name="gender"
                  value="Male"
                  checked={watchGender === "Male"}
                  label="Male"
                ></RadioFormik>
                <RadioFormik
                  name="gender"
                  value="Female"
                  checked={watchGender === "Female"}
                  label="Female"
                ></RadioFormik>
              </div>
            </div>
            <DropdownFormik
              textLabel="Job"
              name="job"
              setValue={formik.setFieldValue}
            ></DropdownFormik>
            <CheckboxFormik
              name="terms"
              text="I accept the terms and conditions"
            ></CheckboxFormik>
            <button
              type="submit"
              className={`w-full p-5 bg-blue-500  text-white rounded-lg  mt-5 font-semibold ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
