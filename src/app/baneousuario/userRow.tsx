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
  fetchData:()=>void;
}

const UserRow: React.FC<UserProps> = ({ user, onUserUpdate, fetchData }) => {
  const handleBanToggle = async (isBanned: boolean) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Estas a punto de ${!isBanned ? "banear" : "desbanear"} a ${user.name} ${user.lastname}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    });
    if(!result.isConfirmed) return
    try {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(async () => {
      if (isBanned) {
        await unbanUser(user.id);
        Swal.close();
        user.isBanned = false; // Sincroniza el estado local con el backend
        Swal.fire({
          title: "Usuario Desbaneado",
          text: `${user.name} ${user.lastname} ha sido desbaneado exitosamente.`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#f97316",
        }).then(()=>fetchData());
      } else {
        await banUser(user.id);
        Swal.close();
        user.isBanned = true; // Sincroniza el estado local con el backend

        Swal.fire({
          title: "Usuario Baneado",
          text: `${user.name} ${user.lastname} ha sido baneado exitosamente.`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#f97316",
        }).then(()=>fetchData());;
      }
      onUserUpdate();},600) // Refresca la lista de usuarios
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
            <span className="text-lg font-semibold text-customPalette-black">{`${user.name} ${user.lastname}`}</span>

            <Field
              as="button"
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                await handleBanToggle(user.isBanned); // Usa el estado sincronizado
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                user.isBanned
                  ? "bg-customPalette-red text-customPalette-white hover:opacity-80"
                  : "bg-customPalette-green text-customPalette-white hover:opacity-80"
              }`}
            >
              {user.isBanned ? "Desbanear" : "Banear"}
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserRow;
