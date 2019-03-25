import React from "react";
import {Form, Field} from "react-final-form";
import {Link} from "@reach/router";

import auth from "../lib/auth";

function Login() {
  async function handleSubmit(values) {
    try {
      await auth.login(values);
    } catch (e) {
      return {[e.code]: e.message};
    }
  }

  return (
    <>
      <div>Login</div>
      <Form onSubmit={handleSubmit}>
        {({handleSubmit, submitting, hasSubmitErrors}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="email"
                placeholder="email"
                component="input"
                type="email"
              />
            </div>
            <div>
              <Field
                name="password"
                placeholder="password"
                component="input"
                type="password"
              />
            </div>
            <button disabled={submitting}>Login</button>
            {hasSubmitErrors && <div>Whoopsy daisy...</div>}
          </form>
        )}
      </Form>
      <div>
        Don't have an account? <Link to="/register">Register now!</Link>
      </div>
    </>
  );
}

export default Login;
