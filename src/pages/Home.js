import React, {useContext} from "react";
import {Form, Field} from "react-final-form";
import {Link} from "@reach/router";

import auth from "../lib/auth";
import {Entries, CurrentUserEntries} from "../lib/refs";
import useCollection from "../hooks/useCollection";
import ctxAuth from "../components/AuthContext";

function Home() {
  const {currentUser} = useContext(ctxAuth);
  const entries = useCollection(CurrentUserEntries());

  async function handleSubmit(values) {
    const payload = {...values, owner: currentUser.uid};
    await Entries().add(payload);
  }

  return (
    <>
      <button onClick={() => auth.logout()}>logout</button>
      <div>Hi {currentUser.displayName}</div>
      <Form onSubmit={handleSubmit}>
        {({handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="name" placeholder="name" component="input" />
            </div>
            <div>
              <Field
                name="description"
                placeholder="description"
                component="textarea"
              />
            </div>
            <button disabled={submitting}>Add</button>
          </form>
        )}
      </Form>
      {entries &&
        entries.map(s => (
          <div key={s.id}>
            <Link to={`/entries/${s.id}`}>
              <h2>{s.name}</h2>
            </Link>
            <div>{s.description}</div>
          </div>
        ))}
    </>
  );
}

export default Home;
