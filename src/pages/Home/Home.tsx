import React, { FC, useContext, useEffect, useState } from "react";
import Container from "../../components/container/container";
import { Link } from "react-router-dom";

import "./Home.scss";
import { IPerson } from "./models";
import Card from "../../components/card/card";
import { useCountPeople } from "../../hooks/useCountPeople";
import { ContextWrapper } from "../../context/context";

const Home: FC<{}> = () => {
  const [page, setPage] = useState<number>(1);
  const [person, setPerson] = useState<IPerson>();
  const [loader, setLoader] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const context = useContext(ContextWrapper);
  const countPeoples = useCountPeople();

  const fetchPeople = async () => {
    setLoader(() => true);
    setImage(() => "");
    try {
      const count = countPeoples == page ? 1 : page;
      fetch("https://swapi.py4e.com/api/people/" + count)
        .then((response) => response.json())
        .then((data) => {
          // context?.setName(data.name);
          // context?.setVehicles([...data.vehicles]);
          // context?.setCreated([...data.created]);

          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("vehicles", data.vehicles);
          sessionStorage.setItem("created", data.created);

          setPerson(data);
          setImage(
            () => "https://picsum.photos/534/383?t=" + new Date().getTime()
          );
          setLoader(() => false);
        });
    } catch (e) {
      console.log(e);
      setLoader(() => false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, [page]);

  const renderPerson = loader ? (
    <h2>Loading...</h2>
  ) : (
    <Card person={person} image={image} />
  );

  return (
    <>
      <Container container customClass="min-h-100 py-1 px-4">
        <div className="homepage_header d-flex-row d-sb">
          <a href="https://github.com/imicadio/imicadio">Michał Jeszko</a>
          <Link
            to="/forms"
            type="button"
            className="header__btn border-none text-italic text-color-white font-size-normal bg-d--green text-left w-100 d-flex d-j-center"
          >
            <span>
              formularz <br /> rejestracyjny
            </span>
          </Link>
        </div>
        <Container element="section">
          <div className="homepage__section bg--gray">{renderPerson}</div>
          <button
            type="button"
            className="section__next-btn bg--green text-color-white border-none"
            onClick={() => setPage(page + 1)}
          >
            next profiles
          </button>
        </Container>
      </Container>
    </>
  );
};

export default Home;
