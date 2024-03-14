"use client";
import styles from "./register.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MyModal from "../components/MyModal";
import "bootstrap/dist/css/bootstrap.min.css";
import Logger from "@/helpers/logger";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModalCancelButton, setShowModalCancelButton] = useState(false);

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      triggerModal("Les mots de passe ne correspondent pas.", false);
      return;
    }
    const pwLength = parseInt(
      process.env.minPassWordLeght ? process.env.minPassWordLeght : "4",
    );

    if (password.length < pwLength || password.trim() === "") {
      triggerModal(
        "Le mot de passe doit contenir au moins " + pwLength + " caractères.",
        false,
      );
      return;
    }
    // Envoi des données à l'API
    const data = {
      email,
      password,
      firstName,
      lastName,
      username,
    };

    fetch(`/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // Le compte a été créé avec succès
        // Rediriger l'utilisateur vers la page de connexion
        window.location.href = "/";
        setLoading(false);
      } else if (response.status === 409) {
        // Une erreur s'est produite
        // Afficher un message d'erreur à l'utilisateur
        console.log(response);
      }
    });
  };

  function triggerModal(message: string, showCancelButton: boolean) {
    setModalMessage(message);
    setShowModalCancelButton(showCancelButton);
    setShowModal(true);
  }

  const handleConfirmAction = () => {
    setLoading(false);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="text-center">Enregistrement</h1>

      <form className="form-group" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6 mt-1">
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>
          <div className="col-12 col-md-3 mt-1">
            <label htmlFor="Password">Mot de passe</label>
            <input
              id="Password"
              className="form-control"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>
          <div className="col-sm-12 col-md-3 mt-1">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>

          <div className="col-sm-12 col-md-3 mt-1">
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              placeholder="Prénom"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>

          <div className="col-sm-12 col-md-3 mt-1">
            <label htmlFor="lastName">Nom de famille</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              placeholder="Nom de famille"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>
          <div className="col-sm-12 col-md-3 mt-1">
            <label htmlFor="userName">UserName</label>
            <input
              id="userName"
              type="text"
              className="form-control"
              placeholder="UserName"
              value={lastName}
              onChange={(e: any) => setUserName(e.target.value)}
              {...(loading ? { disabled: true } : {})}
            />
          </div>
        </div>
        <div className="row text-end ">
          <div className="col">
            <button
              className="btn btn-primary mt-2"
              type="submit"
              {...(loading ? { disabled: true } : {})}
            >
              Enregistrer{" "}
              {loading ? (
                <FontAwesomeIcon icon={fas.faSpinner} className="fa-spin" />
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </form>
      <MyModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmAction}
        showCancelButton={showModalCancelButton}
        message={modalMessage}
      />
    </div>
  );
}
