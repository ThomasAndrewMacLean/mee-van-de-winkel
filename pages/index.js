import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { signInWithGoogle, auth, db, addToArray } from '../utils/firebase';

const IndexPage = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [boodschappen, setBoodschappen] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged(function (u) {
      if (u) {
        console.log('user logged in: ', u);
        setUser(u);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      console.log('GET DATA', user.uid);
      const unsubscribe = db.collection('root').onSnapshot(
        (snapshot) => {
          console.log(snapshot);
          if (snapshot.size) {
            // we have something
            const ingredients = [];
            snapshot.forEach((doc) => ingredients.push({ ...doc.data() }));
            console.log(ingredients);
            setBoodschappen(ingredients[0].boodschappen);
          } else {
            // it's empty
          }
        },
        (err) => {
          console.log(err);
        }
      );
      return unsubscribe;
    }
  }, [user]);
  const login = () => {
    signInWithGoogle();
  };
  const add = (e) => {
    e.preventDefault();
    const item = document.getElementById('item').value;
    console.log(item);
    const ref = db.collection('root').doc('lijstje');
    ref.update({
      boodschappen: addToArray(item),
    });
  };
  const logout = () => {
    auth.signOut();
  };
  return (
    <Main>
      <Head>
        <title>Mee van de winkel</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      {user ? (
        <button onClick={logout}>
          Log out{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      ) : (
        <button onClick={login}>Log in</button>
      )}
      {user && (
        <>
          <h3>{user.displayName}</h3>

          <ul>
            {boodschappen.map((b, i) => {
              return <li key={b + i}>{b}</li>;
            })}
          </ul>

          <form onSubmit={add}>
            <input type="text" name="" id="item" />
            <input type="button" value="ok" />
          </form>
        </>
      )}
    </Main>
  );
};

const Main = styled.main`
  background: var(--background-dark);
`;

export default IndexPage;
