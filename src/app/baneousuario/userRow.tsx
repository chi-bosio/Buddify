"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import { banUser, unbanUser } from "./postData";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  lastname: string;
  isBanned: boolean;
}

interface UserProps {
  user: User;
  onUserUpdate: () => void;
}

const UserRow: React.FC<UserProps> = ({ user, onUserUpdate }) => {
  const handleBanToggle = async (isBanned: boolean) => {
    try {
      if (isBanned) {
        await unbanUser(user.id);
        user.isBanned = false; // Sincroniza el estado local con el backend
        Swal.fire({
          title: "Usuario Desbaneado",
          text: `${user.name} ${user.lastname} ha sido desbaneado exitosamente.`,
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        await banUser(user.id);
        user.isBanned = true; // Sincroniza el estado local con el backend

        Swal.fire({
          title: "Usuario Baneado",
          text: `${user.name} ${user.lastname} ha sido baneado exitosamente.`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      onUserUpdate(); // Refresca la lista de usuarios
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el estado del usuario.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Formik
      initialValues={{ isBanned: user.isBanned }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          await handleBanToggle(values.isBanned);
        } catch (error) {
          console.error("Error updating user:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
            <span className="text-lg font-semibold">{`${user.name} ${user.lastname}`}</span>

            <Field
              as="button"
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                await handleBanToggle(user.isBanned); // Usa el estado sincronizado
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                user.isBanned
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {user.isBanned ? "Unban" : "Ban"}
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserRow;
