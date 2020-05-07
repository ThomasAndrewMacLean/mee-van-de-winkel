import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import {
  signInWithGoogle,
  auth,
  db,
  addToArray,
  removeFromArray,
} from '../utils/firebase';
import { uuidv4, getEmoji } from '../utils';

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
      const unsubscribe = db
        .collection('root')
        // .orderBy('name')
        .onSnapshot(
          (snapshot) => {
            if (snapshot.size) {
              // we have something
              const ingredients = [];
              snapshot.forEach((doc) => ingredients.push({ ...doc.data() }));

              const ordered = ingredients[0].boodschappen.sort((a, b) =>
                b.date - a.date ? 1 : -1
              );
              setBoodschappen(ordered);
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
    const emoji = getEmoji(item.toLowerCase());
    const ref = db.collection('root').doc('lijstje');
    ref.update({
      boodschappen: addToArray({
        name: (item + ' ' + emoji).trim(),
        done: false,
        date: new Date(),
        id: uuidv4(),
      }),
    });

    document.getElementById('item').value = '';
  };
  const remove = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    const ref = db.collection('root').doc('lijstje');

    ref.update({
      boodschappen: removeFromArray(item),
    });
  };
  const toggle = async (item) => {
    console.log(item);
    const ref = db.collection('root').doc('lijstje');
    const x = await ref.get();
    console.log(x.data().boodschappen);
    const oudBoodschappen = x.data().boodschappen;
    oudBoodschappen.find((x) => x.id === item.id).done = !item.done;

    console.log(oudBoodschappen);

    ref.set({ boodschappen: oudBoodschappen });
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
        <LogIn onClick={logout}>
          {user.displayName.split(' ')[0]}
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
        </LogIn>
      ) : (
        <LogIn onClick={login}>
          Log in{' '}
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
            className="feather feather-log-in"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </LogIn>
      )}
      {user ? (
        <>
          <h1>Lijstje</h1>

          <ul>
            {boodschappen.map((b, i) => {
              return (
                <li key={i} onClick={() => toggle(b)}>
                  <div>
                    <span className={b.done ? 'done' : ''}>{b.name}</span>
                    {b.done && (
                      <button onClick={(e) => remove(e, b)}>
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
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <form autocomplete="off" onSubmit={add}>
            <input autocomplete="false" type="text" name="item" required id="item" />
            <button>
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
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </form>
        </>
      ) : (
        <h1>Lijstje</h1>
      )}
      <svg
        id="blob"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <path
            d="M173.7,-141.5C214.9,-86.7,231.3,-15.1,217,50.3C202.7,115.8,157.8,175,107.3,184.7C56.8,194.3,0.9,154.4,-60.5,125C-121.9,95.7,-188.7,77,-198.9,42.5C-209.1,7.9,-162.8,-42.5,-120.2,-97.5C-77.7,-152.6,-38.8,-212.3,13.7,-223.2C66.2,-234.1,132.4,-196.2,173.7,-141.5Z"
            fill="#FFB4BC"
          />
        </g>
      </svg>
    </Main>
  );
};

const Main = styled.main`
  #blob {
    position: fixed;
    top: 0;
    width: 50vmax;
    left: 0;
    transform-origin: 50% 50%;
    animation: move 30s ease-in-out infinite;
  }

  @keyframes move {
    0% {
      transform: scale(1) translate(10px, -30px);
    }
    38% {
      transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
    }
    40% {
      transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
    }
    78% {
      transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
    }
    80% {
      transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
    }
    100% {
      transform: scale(1) translate(10px, -30px);
    }
  }
  button {
    cursor: pointer;
  }
  h1 {
    text-decoration: underline;
  }
  background: white;

  color: #333;
  padding: 2rem 1rem 6rem;
  ul {
    font-size: 1.7rem;
    padding-top: 2rem;
    z-index: 2;
    position: relative;
    li {
      min-height: 48px;
    }
    div {
      display: flex;
      justify-content: space-between;
    }
    button {
      background: darkcyan;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      border: none;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }

  .done {
    text-decoration: line-through;
    color: #888;
  }
  form {
    z-index: 2;
    background: darkcyan;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding-left: 1rem;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
      font-size: inherit;
      font-family: inherit;
      line-height: 40px;
      border-radius: 8px;
      border: none;
      margin: 1rem 0;
      padding-left: 10px;
    }
    button {
      border: none;
      color: white;
      padding: 10px;
      background: none;
    }
  }
`;

const LogIn = styled.button`
  border: 3px solid darkcyan;
  background: darkcyan;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  position: absolute;
  right: 1rem;

  top: 2rem;
  padding: 0.2rem 0.5rem;
  font-family: inherit;
  svg {
    margin-left: 8px;
  }
  &:hover {
    background: none;
    color: #333;
  }
`;

export default IndexPage;
