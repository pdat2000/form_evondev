import React from "react";
import { useForm } from "react-hook-form";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
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
  terms: yup.boolean().required("Please checkbox for term"),
});
const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "Male",
    },
  });
  const onSumbitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolver) => {
      setTimeout(() => {
        resolver();
        console.log(values);
        reset({
          userName: "",
          email: "",
          password: "",
          gender: "Male",
          job: "",
          terms: false,
        });
      }, 5000);
    });
  };
  const watchGender = watch("gender");
  return (
    <form
      onSubmit={handleSubmit(onSumbitHandler)}
      className="max-w-[300px] mx-auto my-10"
    >
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="userName" className="cursor-pointer">
          Username
        </label>
        <InputHook
          name="userName"
          placeholder="Enter your user name"
          id="userName"
          type="text"
          control={control}
        ></InputHook>
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email address
        </label>
        <InputHook
          name="email"
          placeholder="Enter your email address"
          id="email"
          control={control}
          type="email"
        ></InputHook>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          name="password"
          placeholder="Enter your password "
          id="password"
          control={control}
          type="password"
        ></InputHook>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Gender
        </label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="Male"
              checked={watchGender === "Male"}
            ></RadioHook>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="Female"
              checked={watchGender === "Female"}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="text" className="cursor-pointer">
          Are you
        </label>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          dropdownLabel="Select your job"
        ></DropdownHook>
        {errors.job && (
          <p className="text-red-500 text-sm">{errors.job.message}</p>
        )}
      </div>
      <div>
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="terms"
        ></CheckboxHook>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>
      <button
        className={`w-full p-5 bg-blue-500  text-white rounded-lg  mt-5 font-semibold ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
