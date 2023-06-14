import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

type formDataType = {
  name: string;
  game: string[];
  gender: String;
  city: String;
  state: String | undefined;
  pincode: Number | undefined;
  phone: Number | undefined;
  address: String;
};

const CustomForm = () => {
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    game: [],
    gender: "",
    city: "",
    state: "",
    pincode: 0,
    phone: 0,
    address: "",
  });

  const initialValues = {
    name: "",
    game: "",
    gender: "",
    city: "",
    state: "",
    pincode: 0,
    phone: 0,
    address: "",
  };

  const yupSchema = Yup.object().shape({
    name: Yup.string().required("required field"),
    game: Yup.string().required("required field"),
    gender: Yup.string().required("required field"),
    city: Yup.string().required("required field"),
    state: Yup.string().required("required field"),
    pincode: Yup.number(),
    phone: Yup.number(),
    address: Yup.string(),
  });

  return (
    <>
      <h1>Custom Form</h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={yupSchema}
          onSubmit={(values) => console.log(values)}
        >
          <form>
            <div>
              <input placeholder="enter name" type="text" name="name" />
            </div>
            <div>
              <input name="games" type="checkbox" value="cricket" />
              cricket
              <input name="games" type="checkbox" value="chess" />
              football
              <input name="games" type="checkbox" value="football" />
              chess
            </div>
            <div>
              <input type="radio" name="male" />
              female
              <input type="radio" name="female" />
              male
            </div>
            <div></div>
            <div></div>
            <select name="city">
              <option>abcd</option>
              <option>efgh</option>
              <option>jklm</option>
              <option>acd</option>
              <option>abc</option>
              <option>cd</option>
            </select>
            <select name="state">
              <option>2</option>
            </select>
            <input name="pincode" type="text" />
            <input name="phone" type="text" />
          </form>
        </Formik>
      </div>
    </>
  );
};

export default CustomForm;
