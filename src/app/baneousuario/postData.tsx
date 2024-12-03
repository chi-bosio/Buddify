export const banUser = async (userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/ban`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error response body:", await response.text());
    throw new Error(`Failed to ban user with ID ${userId}`);
  }

  return response.json();
};

export const unbanUser = async (userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/unban`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to unban user with ID ${userId}`);
  }

  return response.json();
};
