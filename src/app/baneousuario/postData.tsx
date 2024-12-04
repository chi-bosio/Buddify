export const banUser = async (userId: string,token:string|null) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/ban`;
  if(!token) return;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    console.error("Error response body:", await response.text());
    throw new Error(`Failed to ban user with ID ${userId}`);
  }

  return response.json();
};

export const unbanUser = async (userId: string,token:string|null) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/unban`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to unban user with ID ${userId}`);
  }

  return response.json();
};
