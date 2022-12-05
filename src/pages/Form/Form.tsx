import React, { FC, useState } from "react";
import Container from "../../components/container/container";
import { formValid } from "../../helpers/formValid";
import "./Form.scss";

import { IProduct } from "./IProduct.model";

const Forms: FC<{}> = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<{
    [key: string]: IProduct;
    login: IProduct;
    password: IProduct;
    email: IProduct;
    phone: IProduct;
    checkbox: IProduct;
  }>({
    login: {
      text: "Login",
      value: "",
      error: true,
      type: "login",
      inputType: "text",
      validPattern: "login",
      helperText: "Please enter a valid login",
    },
    password: {
      text: "Hasło",
      value: "",
      error: true,
      type: "password",
      inputType: "password",
      validPattern: "password",
      helperText: "Invalid password",
    },
    email: {
      text: "E-mail",
      value: "",
      error: true,
      type: "email",
      inputType: "email",
      validPattern: "email",
      helperText: "Please enter a valid email address",
    },
    phone: {
      text: "Telefon",
      value: "",
      error: true,
      type: "phone",
      inputType: "tel",
      validPattern: "phone",
      helperText: "Invalid phone number",
    },
    checkbox: {
      text: "Akceptuję regulamin",
      value: false,
      error: true,
      type: "checkbox",
      inputType: "checkbox",
      validPattern: "checkbox",
      helperText: "Wymagana akceptacja regulaminu",
    },
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name: type,
      value,
      checked,
    }: { name: string; value: string; checked?: boolean } = e.target;

    if (type === "checkbox") {
      setForm((form) => ({
        ...form,
        [type]: {
          ...form[type],
          value: checked,
          error: !checked,
        },
      }));
    } else {
      setForm((form) => ({
        ...form,
        [type]: {
          ...form[type],
          value: value,
          error: formValid(form[type].validPattern as string, value),
        },
      }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(() => true);
    console.log(form);
  };

  const renderInputs = Object.entries(form).map((item, id) => {
    if (item[1].type !== "checkbox") {
      return (
        <fieldset
          className={
            "input__wrapper " + (isSubmitted && item[1].error ? "error" : "")
          }
          key={id}
        >
          <label htmlFor={item[1].type ?? ""}>{item[1].type}:</label>
          <input
            type={item[1].inputType ?? ""}
            id={item[1].type ?? ""}
            name={item[1].type ?? ""}
            onChange={handleForm}
          />
          <span
            style={
              isSubmitted && item[1].error
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {item[1].helperText}
          </span>
        </fieldset>
      );
    } else {
      return (
        <fieldset
          className={
            "input__wrapper input__wrapper__checkbox " +
            (isSubmitted && item[1].error ? "error" : "")
          }
          key={id}
        >
          <input
            type="checkbox"
            id={item[1].type}
            name={item[1].type}
            checked={item[1].value as boolean}
            onChange={handleForm}
          />
          <label htmlFor={item[1].type}>{item[1].text}</label>
          <span
            style={
              isSubmitted && item[1].error
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {item[1].helperText}
          </span>
        </fieldset>
      );
    }
  });

  return (
    <Container container customClass="min-h-100 py-1 px-4">
      <div className="form-wrapper">
        <h3>Formularz rejestracyjny</h3>
        <div className="divider"></div>
        <form onSubmit={handleSubmit}>{renderInputs}</form>
        <button
          type="button"
          className="form-subtmit bg--blue text-color-white border-none"
          onClick={handleSubmit}
        >
          zapisz
        </button>
      </div>
    </Container>
  );
};

export default Forms;
