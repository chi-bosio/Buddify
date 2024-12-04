"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { cancellActivity} from "./postData";
import Swal from "sweetalert2";
import { useAuthContext } from "@/contexts/authContext";
import { Activity, ActivityStatus } from "@/components/Interfaces/activity.interface";
import ModalActivity from "./ModalActivity/ModalActivity";
import { Eye } from "lucide-react";



interface UserProps {
  activity: Activity;
  onAcitivities: () => void;
  fetchData:()=>void;
  reports?:{description:string;id:string;}[]
}

const UserRow: React.FC<UserProps> = ({ activity, onAcitivities, fetchData, reports }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setIsModalOpen(false);
  };
  const { userId} = useAuthContext();
  const [user,setUser] = useState("");
  useEffect(()=>{
    if(userId){
      setUser(userId)
    }
  },[userId])

  const handleCancelToggle = async () => {
    if(!userId) return;
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Estas a punto de cancelar la actividad '${activity.name}'!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#235789",
      cancelButtonText: "Volver atras",
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
        if(!await  cancellActivity(user,activity.id)){
          throw new Error("Ocurrio un error")
        } 
        Swal.close();
        Swal.fire({
          title: "Actividad cancelada con exito!",
          text: `Se cancelo la actividad '${activity.name}' !`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#f97316",
        }).then(()=>{
          fetchData();
          onAcitivities();
        })
    },600) 
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el estado de la actividad.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
    <Formik
      initialValues={
        {ini:""}
      }
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        try {
          await handleCancelToggle();
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
            <span className="text-lg font-semibold text-customPalette-black">{`${activity.name}`}</span>
            <Eye className="h-6 w-6 mr-4 text-customPalette-blue hover:text-customPalette-bluelight cursor-pointer" onClick={()=>{openModal(activity)}}></Eye>
            {activity.status !== ActivityStatus.CANCELLED && activity.status !== ActivityStatus.SUCCESS && (
              <Field
                as="button"
                type="button"
                disabled={isSubmitting}
                onClick={async () => {
                  await handleCancelToggle(); 
                }}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 bg-customPalette-red text-customPalette-white hover:opacity-80`}
              >
                Cancelar Actividad
              </Field>
          )}
          </div>
        </Form>
      )}
      
    </Formik>
    {selectedActivity && (
      <ModalActivity
        reports={reports}
        onCancell={handleCancelToggle}
        {...selectedActivity}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
    )}</>
  );
};

export default UserRow;
