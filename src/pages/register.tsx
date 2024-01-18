import styles from './register.module.css'
import { useState } from "react";


export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Envoi des données à l'API
    const data = {
      email,
      password,
    };

    fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Le compte a été créé avec succès
          // Rediriger l'utilisateur vers la page de connexion
          window.location.href = '/';
        } else {
          // Une erreur s'est produite
          // Afficher un message d'erreur à l'utilisateur
          console.log(data.error);
        }
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Enregistrement</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e:any) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
