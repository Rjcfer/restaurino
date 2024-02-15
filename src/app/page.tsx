// Importer les modules nécessaires
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const restaurantNameRef = useRef<HTMLHeadingElement>(null);
  const loginBtnRef = useRef<HTMLAnchorElement>(null);
  const registerBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const animateElements = () => {
      setTimeout(() => {
        if (restaurantNameRef.current) {
          restaurantNameRef.current.style.opacity = "1";
          restaurantNameRef.current.style.transform = "translateY(0)";
        }
      }, 500);

      setTimeout(() => {
        if (loginBtnRef.current) {
          loginBtnRef.current.style.opacity = "1";
          loginBtnRef.current.style.transform = "translateY(0)";
        }
      }, 1000);

      setTimeout(() => {
        if (registerBtnRef.current) {
          registerBtnRef.current.style.opacity = "1";
          registerBtnRef.current.style.transform = "translateY(0)";
        }
      }, 1500);
    };

    animateElements();
  }, []);

  return (
    <main>
      <div
        className="container mt-5 d-flex flex-column align-items-center justify-content-center"
        style={{
          height: "90vh",
          width: "100vw",
        }}
      >
        <h1
          className="text-center display-1"
          style={{
            opacity: 0,
            transform: "translateY(50px)",
            transition: "opacity 0.5s, transform 0.5s",
          }}
          ref={restaurantNameRef as React.MutableRefObject<HTMLHeadingElement>}
        >
          Restaurino
        </h1>
        <div className="text-center mt-3">
          <Link href="/login" legacyBehavior>
            <a
              className="btn btn-primary m-2"
              style={{
                opacity: 0,
                transform: "translateY(50px)",
                transition: "opacity 0.5s, transform 0.5s 0.5s",
              }}
              ref={loginBtnRef as React.MutableRefObject<HTMLAnchorElement>}
            >
              Connexion
            </a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a
              className="btn btn-secondary m-2"
              style={{
                opacity: 0,
                transform: "translateY(50px)",
                transition: "opacity 0.5s, transform 0.5s 1s",
              }}
              ref={registerBtnRef as React.MutableRefObject<HTMLAnchorElement>}
            >
              Enregistrement
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
}
