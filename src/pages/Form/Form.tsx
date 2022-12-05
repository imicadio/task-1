import React, { FC, useContext, useState } from "react";
import Container from "../../components/container/container";
import { ContextWrapper } from "../../context/context";
import { formValid } from "../../helpers/formValid";
import "./Form.scss";

import { IPerson } from "./IPerson.model";

const Forms: FC<{}> = () => {
  const context = useContext(ContextWrapper);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<{
    [key: string]: IPerson;
    login: IPerson;
    password: IPerson;
    email: IPerson;
    phone: IPerson;
    checkbox: IPerson;
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

  const postData = async (url: string, data: object) => {
    try {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!responseData.ok) {
        return;
      }

      console.log("DATA: ", data);
      console.log("DATA stringify: ", JSON.stringify(data));
      console.log(responseData);
    } catch (e) {
      console.log("DATA: ", data);
      console.log("DATA stringify: ", JSON.stringify(data));
      console.log("Nie udało się wysłać danych: ", e);
    }
  };

  const handleSubmit = () => {
    const validForm = Object.values(form).map((item) => !item.error);
    const isValid = validForm.every(Boolean);

    if (!isValid) {
      return setIsSubmitted(() => true);
    }

    postData("https://example/", {
      form,
      person: [
        sessionStorage.getItem("name"),
        sessionStorage.getItem("vehicles"),
        sessionStorage.getItem("created"),
      ],
    });
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
