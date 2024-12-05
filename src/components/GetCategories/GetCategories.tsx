"use client";

import { useEffect, useState } from "react";
import Toast, { TypeToast } from "../Toast/Toast";
import { getCategories } from "./components/getCategories";

export function GetCategories({formik}:{formik:any}){
    const [categories, setCategories] = useState<{id:string;name:string;}[] |null>(null)
    const getCat = async () => {
        const cat = await getCategories();
        if (Array.isArray(cat)) {
          setCategories(cat);
        } else {
          Toast(TypeToast.Error, "No se pudieron cargar las categorías.");
        }
      };
    useEffect(()=>{
        getCat()
      },[])
    return (
        <div className="relative flex justify-center items-center">
            {categories && categories.length === 0 ? (
                <div className="text-red-500">No hay categorías disponibles</div>
            ) : null}
            <label
                htmlFor="categoryId"
                className="absolute -top-3 left-2 bg-customPalette-white px-1 text-sm font-medium text-customPalette-blue mt-1"
            >
                Categoria
            </label>
            <select
                id="categoryId"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={(event) => {
                formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                className="block w-full p-2 border border-customPalette-gray rounded-md shadow-sm focus:ring-customPalette-blue focus:border-customPalette-blue text-customPalette-graydark  "
            >
                <option value="">Seleccionar categoria</option>
                {categories ? (
                categories.map((cat, index) => (
                    <option key={index} value={cat.id}>
                    {cat.name}
                    </option>
                ))
                ) : (
                <option value="" disabled>Cargando categorías...</option>
                )}
            </select>
        </div>
    );
}

export default GetCategories;
