"use client";
import { useAuthContext } from "@/contexts/authContext";
import { useCallback, useEffect, useState } from "react";
import EarningsChart from "./components/earningsChart/earningsChart";
import getDataEarnings from "./components/getDataEarnings";
import getDataEarningsTotal from "./components/getDataEarningsTotal";
import Cake from "./components/cake/cake";
import getDataCountPremiumCountries from "./components/getDataCountPremiumCountries";
import getDataCountPremium from "./components/getDataCountPremium";
import getDataActivities from "./components/getDataActivities";
import getDataActivitiesTotal from "./components/getDataActivitiesTotal";
import getDataCountActivitiesCountries from "./components/getDataCountActivitiesCountries";
import getDataUsersTotal from "./components/getDataUsersTotal";
import getDataCountUsersCountries from "./components/getDataCountUsersCountries";
import getDataUsersBannedTotal from "./components/getDataUsersBannedTotal";
import  AdminUsersBan from "../baneousuario/managements";
import Swal from "sweetalert2";
import getDataActivitiesSuccess from "./components/getDataActivitiesSuccess";
import getDataActivitiesPending from "./components/getDataActivitiesPending";
import getDataActivitiesConfirmed from "./components/getDataActivitiesConfirmed";
import getDataActivitiesCancelled from "./components/getDataActivitiesCancelled";
import AdminUsersToAdmin from "../toadmin/manegements";
import AdminActivities from "../adminactivities/managements";
import useTokenExpiration from "@/hooks/useExpirationToken";

export function Analytics() {
  useTokenExpiration();
  const { authTokens } = useAuthContext();
  const [token, setToken] = useState<string | null>(""); 
  //users
  const [usersBannedTotal, setUsersBannedTotal] = useState<number>(0);
  const [usersTotal, setUsersTotal] = useState<number>(0);
  const [coutUsersCountries, setCoutUsersCountries] = useState<{name: string;total: number}[]>([]);
  //earnings
  const [earnings, setEarnings] = useState<{ name: string; total: number }[]>([]);
  const [earningsTotal, setEarningsTotal] = useState<number>(0);
  const [coutPremiumCountries, setCoutPremiumCountries] = useState<{name: string;total: number}[]>([]);
  const [coutPremium, setCoutPremium] = useState<number>(0);
  //activities
  const [activitiesTotalSuccess, setActivitiesTotalSuccess] = useState<number>(0);
  const [activitiesTotalConfirmed, setActivitiesTotalConfirmed] = useState<number>(0);
  const [activitiesTotalPending, setActivitiesTotalPending] = useState<number>(0);
  const [activitiesTotalCancelled, setActivitiesTotalCancelled] = useState<number>(0);
  const [activitiesTotal, setActivitiesTotal] = useState<number>(0);
  const [countctivities, setActivities] = useState<{ name: string; total: number }[]>([]);
  const [coutActivitiesCountries, setCoutActivitiesCountries] = useState<{name: string;total: number}[]>([]);
  
  const fetchData = useCallback(async () => {
    if (token) {
      Swal.fire({
        title: "Cargando...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setUsersBannedTotal(await getDataUsersBannedTotal(token));
      setUsersTotal(await getDataUsersTotal(token));
      setCoutUsersCountries(await getDataCountUsersCountries(token));

      setEarnings(await getDataEarnings(token));
      setEarningsTotal(await getDataEarningsTotal(token));
      setCoutPremiumCountries(await getDataCountPremiumCountries(token));
      setCoutPremium(await getDataCountPremium(token));

      setActivitiesTotalSuccess(await getDataActivitiesSuccess(token));
      setActivitiesTotalConfirmed(await getDataActivitiesConfirmed(token));
      setActivitiesTotalPending(await getDataActivitiesPending(token));
      setActivitiesTotalCancelled(await getDataActivitiesCancelled(token));
      setActivitiesTotal(await getDataActivitiesTotal(token));
      setActivities(await getDataActivities(token));
      setCoutActivitiesCountries(await getDataCountActivitiesCountries(token));
      Swal.close();
    }
  }, [token]);

  useEffect(() => {
    if (authTokens?.token) {
      setToken(authTokens?.token);
    }
  }, [authTokens?.token]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, fetchData]);

  return (
    <section className="bg-[url('/assets/textura-fondo.avif')] min-h-screen bg-customPalette-white p-4 ">
        <section className="flex items-start justify-evenly lg:flex-row flex-col h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white mb-4">
            <section className="flex items-start justify-evenly gap-4 mb-4 lg:mb-0">
              <div className="flex flex-col items-start justify-start">
                  <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Usuarios </h2>
                  <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Usuarios Premium </h2>
                  <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Usuarios Baneados </h2>
              </div>
              <div className="flex flex-col items-start justify-start">
                  <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{usersTotal}</span> 
                  <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{coutPremium}</span> 
                  <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{usersBannedTotal}</span> 
              </div>
            </section>
            <section className="flex items-start justify-evenly flex-col lg:flex-row gap-4">
              <div className="flex">
                <div className="flex flex-col items-start justify-start  mr-4">
                    <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Actividades creadas </h2>
                    <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Actividades finalizadas </h2>
                    <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Actividades confirmadas </h2>
                </div>
                <div className="flex flex-col items-start justify-start">
                    <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{activitiesTotal}</span> 
                    <span className="text-center w-auto text-customPalette-orange font-semibold text-lg block">{activitiesTotalSuccess}</span> 
                    <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{activitiesTotalConfirmed}</span> 
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-start justify-start mr-4">
                    <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Actividades pendientes </h2>
                    <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Actividades candeladas </h2>
                </div>
                <div className="flex flex-col items-start justify-start">
                    <span className="text-center w-auto text-customPalette-graydark font-semibold text-lg block">{activitiesTotalPending}</span> 
                    <span className="text-center w-auto text-customPalette-red font-semibold text-lg block">{activitiesTotalCancelled}</span> 
                </div>
              </div>
            </section>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="flex items-center justify-start flex-col gap-4">   
            <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
                <h2 className="text-center text-lg text-customPalette-blue font-semibold">
                  Ganancias 
                  <span className="text-customPalette-green text-lg ml-2">${earningsTotal}</span>
                </h2>
                <EarningsChart data={earnings} />
            </div>
            <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
              <h2 className="text-center text-lg text-customPalette-blue font-semibold">Usuarios Premium por País</h2>
                <Cake data={coutPremiumCountries} />
            </div>
            <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
              <h2 className="text-center text-lg text-customPalette-blue font-semibold">Usuarios por País</h2>
                <Cake data={coutUsersCountries} />
            </div>
            <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
               <AdminUsersBan fetchData={fetchData}/>
            </div>
            <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
               <AdminUsersToAdmin />
            </div>
          </section>
          <section className="flex items-start justify-start flex-col gap-4">
              <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
                  <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Distribución mensual de actividades creadas </h2>
                  <EarningsChart data={countctivities} />
              </div>
              <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
                <h2 className="text-center text-lg text-customPalette-blue font-semibold">Actividades creadas por País</h2>
                  <Cake data={coutActivitiesCountries} />
              </div>
              <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white">
                <AdminActivities fetchData={fetchData}/>
              </div>
          </section>
        </section>
          
    </section>
  );
}

export default Analytics;
