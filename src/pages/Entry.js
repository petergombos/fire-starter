import React from "react";
import {Form, Field} from "react-final-form";
import {Link} from "@reach/router";

import db from "../lib/db";
import useDocument from "../hooks/useDocument";

function Entry({entryID}) {
  const entryRef = db.doc(`/entries/${entryID}`);
  const entry = useDocument(entryRef);

  if (!entry) {
    return null;
  }

  async function handleSubmit(values) {
    try {
      await entryRef.update(values);
    } catch (e) {
      return {[e.code]: e.message};
    }
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <Form onSubmit={handleSubmit} initialValues={entry}>
        {({handleSubmit, submitting, hasSubmitErrors}) => (
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
            <button disabled={submitting}>Update</button>
            {hasSubmitErrors && <div>Whoopsy daisy...</div>}
          </form>
        )}
      </Form>
    </div>
  );
}

export default Entry;
