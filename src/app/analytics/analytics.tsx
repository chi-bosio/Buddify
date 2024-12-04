"use client";
import { useAuthContext } from "@/contexts/authContext";
import { useCallback, useEffect, useState } from "react";
import EarningsChart from "./components/earningsChart/earningsChart";
import getDataEarnings from "./components/getDataEarnings";
import getDataEarningsTotal from "./components/getDataEarningsTotal";
import Cake from "./components/cake/cake";
import getDataCountPremiumCountries from "./components/getDataCountPremiumCountries";
import getDataCountPremium from "./components/getDataCountPremium";

export function Analytics() {
  const { authTokens } = useAuthContext();
  const [token, setToken] = useState<string | null>(""); 
  const [earnings, setEarnings] = useState<{ month: string; total: number }[]>([]);
  const [earningsTotal, setEarningsTotal] = useState<number>(0);
  const [coutPremiumCountries, setCoutPremiumCountries] = useState<{country: string;premiumCount: number}[]>([]);
  const [coutPremium, setCoutPremium] = useState<number>(0);
  const fetchData = useCallback(async () => {
    if (token) {
      const data = await getDataEarnings(token);
      setEarnings(data);
      const dataEarningsTotal = await getDataEarningsTotal(token);
      setEarningsTotal(dataEarningsTotal);
      const datacoutPremiumCountries = await getDataCountPremiumCountries(token);
      setCoutPremiumCountries(datacoutPremiumCountries);
      const datacoutPremium = await getDataCountPremium(token);
      setCoutPremium(datacoutPremium);
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

  if (earnings.length === 0) {
    return <div>No hay ganancias aún...</div>;
  }

  return (
    <section className="bg-[url('/assets/textura-fondo.avif')] min-h-screen bg-customPalette-white p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="flex items-center justify-start flex-col gap-4">
          <div className="h-auto w-full p-8 bg-customPalette-white rounded-xl shadow-lg border border-customPalette-white mb-4">
              <h2 className="text-center text-lg text-customPalette-blue font-semibold"> Usuarios Premium </h2>
              <span className="text-center w-auto text-customPalette-green font-semibold text-lg block">{coutPremium}</span> 
          </div>
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
          
        </section>
      <section className="flex items-start justify-center">
      </section>
          
    </section>
  );
}

export default Analytics;
