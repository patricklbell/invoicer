import fetcher from 'utils/fetcher';

export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export function logout() {
  localStorage.setItem('token', null);
}

export async function login(username, password) {
  return fetcher([
    '/user/login',
    {
      method: 'post',
      data: {
        username,
        password
      }
    }
  ]).then((res) => {
    localStorage.setItem('token', res.token);
  });
}

export async function signup(username, email, password, firstname, lastname) {
  return fetcher([
    '/user/signup',
    {
      method: 'post',
      data: {
        username,
        email,
        password,
        firstname,
        lastname
      }
    }
  ]);
}

export async function update(updates = {}) {
  return fetcher([
    '/user/',
    {
      method: 'patch',
      data: updates
    }
  ]);
}

export async function remove() {
  return fetcher([
    '/user/',
    {
      method: 'delete'
    }
  ]);
}
