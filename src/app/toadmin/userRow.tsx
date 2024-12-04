import React from "react";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  lastname: string;
  isAdmin: boolean;
}

interface UserProps {
  user: User;
  onUserUpdate: () => void;
  fetchData: () => void; // Asegúrate de que fetchData esté correctamente tipada
}

const UserRow: React.FC<UserProps> = ({ user, onUserUpdate, fetchData }) => {
  const handlePromoteDemote = async (isAdmin: boolean) => {
    const action = isAdmin ? "despromover" : "promover";
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de ${action} a ${user.name} ${user.lastname} como administrador.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/${
        isAdmin ? "demote" : "promote"
      }`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.close();
        Swal.fire({
          title: `Usuario ${isAdmin ? "despromovido" : "promovido"}`,
          text: `${user.name} ${user.lastname} ha sido ${
            isAdmin ? "despromovido" : "promovido"
          } exitosamente.`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#f97316",
        }).then(() => fetchData()); // Llama a `fetchData` después de la acción
      } else {
        throw new Error("Error al cambiar el estado del usuario");
      }
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
      initialValues={{ isAdmin: user.isAdmin }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          await handlePromoteDemote(values.isAdmin); // Llama a la función para promover o despromover
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
                await handlePromoteDemote(user.isAdmin); // Usa el estado sincronizado
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                user.isAdmin
                  ? "bg-customPalette-red text-customPalette-white hover:opacity-80"
                  : "bg-customPalette-green text-customPalette-white hover:opacity-80"
              }`}
            >
              {user.isAdmin
                ? "Despromover a Usuario"
                : "Promover a Administrador"}
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserRow;
