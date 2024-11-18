import Link from "next/link";

export function Activities() {
  return (
    <div className="p-6 rounded-lg shadow-md border border-customPalette-gray max-w-md bg-customPalette-white">
      <h2 className="text-2xl font-semibold text-customPalette-blue mb-6">
        Actividades
      </h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="/activities/create-activity"
            className="text-customPalette-blue hover:text-customPalette-bluedark underline"
          >
            Crear actividad
          </Link>
        </li>
        <li>
          <Link
            href="/activities/view-activities"
            className="text-customPalette-blue hover:text-customPalette-bluedark underline"
          >
            Ver actividades
          </Link>
        </li>
        <li>
          <Link
            href="/activities/manage-activities"
            className="text-customPalette-blue hover:text-customPalette-bluedark underline"
          >
            Gestionar actividades
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Activities;
