export const promoteToAdmin = async (userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/promote`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to promote user with ID ${userId} to admin`);
  }

  return response.json();
};

export const demoteFromAdmin = async (userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/demote`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to demote user with ID ${userId} from admin`);
  }

  return response.json();
};
