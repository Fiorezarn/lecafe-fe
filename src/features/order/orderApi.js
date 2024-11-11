const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

const fetchCreateOrder = async ({
  userId,
  site,
  typeOrder,
  totalPrice,
  menuJson,
}) => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      userId,
      site,
      typeOrder,
      totalPrice,
      menuJson,
    }),
  });
  return await response.json();
};

const fetchAllOrder = async (id) => {
  const response = await fetch(`${BASE_URL}/order/${id}`);
  return await response.json();
};

const fetchCoordinates = async (data) => {
  const response = await fetch(`${BASE_URL}/maps/create-polyline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return await response.json();
};

const fetchPayments = async ({ email, amount, id }) => {
  const response = await fetch(`${BASE_URL}/order/payments/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      amount,
    }),
  });

  return await response.json();
};

const verifyPayments = async (id) => {
  const response = await fetch(`${BASE_URL}/order/verify-payment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await response.json();
};

const fetchCancelPayments = async (id) => {
  const response = await fetch(`${BASE_URL}/order/cancel-payment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await response.json();
};

const fetchDeliveryOrder = async () => {
  const response = await fetch(`${BASE_URL}/order/delivery`);
  return await response.json();
};

export {
  fetchCreateOrder,
  fetchAllOrder,
  fetchCoordinates,
  fetchPayments,
  verifyPayments,
  fetchCancelPayments,
  fetchDeliveryOrder,
};
