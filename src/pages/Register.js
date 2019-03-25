import React from "react";
import {Form, Field} from "react-final-form";
import {Link} from "@reach/router";

import auth from "../lib/auth";

function Register() {
  async function handleSubmit(values) {
    try {
      await auth.register(values);
    } catch (e) {
      return {[e.code]: e.message};
    }
  }

  return (
    <>
      <div>Register</div>
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
            <div>
              <Field
                name="firstName"
                placeholder="firstName"
                component="input"
              />
            </div>
            <div>
              <Field name="lastName" placeholder="lastName" component="input" />
            </div>
            <button disabled={submitting}>Register</button>
            {hasSubmitErrors && <div>Whoopsy daisy...</div>}
          </form>
        )}
      </Form>
      <div>
        Have an account already? <Link to="/login">Login now!</Link>
      </div>
    </>
  );
}

export default Register;
