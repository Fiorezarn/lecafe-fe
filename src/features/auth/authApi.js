const BASE_API = import.meta.env.VITE_BASE_URL_BE;

async function fetchRegister({
  fullname,
  username,
  email,
  phonenumber,
  password,
}) {
  try {
    const response = await fetch(`${BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fullname,
        username,
        email,
        phonenumber,
        password,
      }),
    });
    return await response.json();
  } catch (error) {}
}

async function fetchlogin({ input, password }) {
  const response = await fetch(`${BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ input, password }),
  });
  return await response.json();
}

async function fetchLoginGoogle(idToken) {
  const response = await fetch(`${BASE_API}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
    }),
    credentials: "include",
  });
  return await response.json();
}

async function fetchLogout() {
  const response = await fetch(`${BASE_API}/auth/logout`, {
    credentials: "include",
  });
  return await response.json();
}

export { fetchRegister, fetchlogin, fetchLoginGoogle, fetchLogout };
