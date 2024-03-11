"use client";
import styles from './register.module.css'
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUserName] = useState('');
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas.");
      return;
    }
    // Envoi des données à l'API
    const data = {
      email,
      password,
      firstName,
      lastName,
      username
    };

    fetch(`/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Le compte a été créé avec succès
          // Rediriger l'utilisateur vers la page de connexion
          window.location.href = '/';
        } else if (response.status === 409) {
          
          // Une erreur s'est produite
          // Afficher un message d'erreur à l'utilisateur
          console.log(response);
        } 
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Enregistrement</h1>
      <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="col">
                  <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e:any) => setEmail(e.target.value)}
        />
        </div>
        <div className="col"><input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
        /></div>
        <div className="col"> <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e:any) => setConfirmPassword(e.target.value)}
        /></div>
        <div className="col"><input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e:any) => setFirstName(e.target.value)}
        /></div>

        <div className="col"> <input
          type="text"
          placeholder="Nom de famille"
          value={lastName}
          onChange={(e:any) => setLastName(e.target.value)}
        /></div>
       <div className="col"> <input
          type="text"
          placeholder="UserName"
          value={lastName}
          onChange={(e:any) => setUserName(e.target.value)}
        /></div>
        
       
        <button type="submit">Enregistrer</button>
      </form>
    </div>
    </div>
  );
}
