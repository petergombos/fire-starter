import React, {useContext} from "react";
import {Form, Field} from "react-final-form";
import {Link} from "@reach/router";

import auth from "../lib/auth";
import db from "../lib/db";
import useCollection from "../hooks/useCollection";
import ctxAuth from "../components/AuthContext";

function Home() {
  const {currentUser} = useContext(ctxAuth);
  const entriesRef = db.col("/entries");
  const entries = useCollection(entriesRef);

  async function handleSubmit(values) {
    await entriesRef.add(values);
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
            <div>Created: {new Date(s.createdAt).toString()}</div>
            <div>Updated: {new Date(s.updatedAt).toString()}</div>
          </div>
        ))}
    </>
  );
}

export default Home;
