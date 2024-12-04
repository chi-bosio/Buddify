export const updateUserProfile = async (userId: string, updatedData: any/*, authToken: any*/) => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
//        "Authorization": `Bearer ${authToken}`, // Se agrega el token para la autenticación
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar el perfil");
  }
  return response.json();
};
