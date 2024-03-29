import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@/pages/global.scss";
import React from "react";
import App from "next/app";
import Cookies from "js-cookie";
import Router from "next/router";
import { ToastContainer } from "react-toastify";

class MyApp extends App {
  componentDidMount() {
    const token = Cookies.get("token");

    if (
      !token &&
      Router.pathname !== "/login" &&
      Router.pathname !== "/signup"
    ) {
      Router.push("/login");
    } else if (token && Router.pathname === "/_error") {
      Router.push("/home");
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ToastContainer />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
