/**
 * Página: AdminInstitutionDetailPage
 * Vista de administrador — Detalle de institución (solo lectura)
 * Única acción editable: Cambiar el Director (directorId)
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
     ArrowLeft,
     Building2,
     MapPin,
     Phone,
     Clock,
     Users,
     UserCog,
     Save,
     X,
} from "lucide-react";
import { institutionService } from "../service/Institution.service";
import {
     showSuccessAlert,
     showErrorAlert,
     showLoadingAlert,
     closeAlert,
} from "../../../shared/utils/sweetAlert";
import type { InstitutionCompleteResponse } from "../models/Institution.interface";

export function AdminInstitutionDetailPage() {
     const { institutionId } = useParams<{
          institutionId: string;
     }>();
     const navigate = useNavigate();

     const [institution, setInstitution] =
          useState<InstitutionCompleteResponse | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     // Director editing
     const [editingDirector, setEditingDirector] = useState(false);
     const [directorIdInput, setDirectorIdInput] = useState("");
     const [savingDirector, setSavingDirector] = useState(false);

     useEffect(() => {
          if (institutionId) {
               fetchInstitution();
          }
     }, [institutionId]);

     const fetchInstitution = async () => {
          try {
               setLoading(true);
               setError(null);
               const data =
                    await institutionService.getInstitutionById(
                         institutionId!
                    );
               setInstitution(data);
               setDirectorIdInput(data.directorId || "");
          } catch (err) {
               setError(
                    err instanceof Error
                         ? err.message
                         : "Error al cargar la institución"
               );
          } finally {
               setLoading(false);
          }
     };

     // ---- Cambiar Director ----

     const handleStartEditDirector = () => {
          setDirectorIdInput(institution?.directorId || "");
          setEditingDirector(true);
     };

     const handleCancelEditDirector = () => {
          setDirectorIdInput(institution?.directorId || "");
          setEditingDirector(false);
     };

     const handleSaveDirector = async () => {
          try {
               setSavingDirector(true);
               showLoadingAlert("Actualizando director...");
               await institutionService.update(institutionId!, {
                    directorId: directorIdInput || "",
               });
               closeAlert();

               // Actualizar local
               setInstitution((prev) =>
                    prev
                         ? {
                                ...prev,
                                directorId: directorIdInput,
                           }
                         : prev
               );
               setEditingDirector(false);

               showSuccessAlert(
                    "Director actualizado",
                    "El director de la institución ha sido actualizado correctamente"
               );
          } catch (err) {
               closeAlert();
               showErrorAlert(
                    "Error al actualizar",
                    err instanceof Error
                         ? err.message
                         : "Error desconocido"
               );
          } finally {
               setSavingDirector(false);
          }
     };

     // ---- Loading / Error ----

     if (loading) {
          return (
               <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
               </div>
          );
     }

     if (error || !institution) {
          return (
               <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                         <div className="flex">
                              <div className="ml-3">
                                   <h3 className="text-sm font-medium text-red-800">
                                        Error
                                   </h3>
                                   <div className="mt-2 text-sm text-red-700">
                                        {error ||
                                             "Institución no encontrada"}
                                   </div>
                                   <div className="mt-4">
                                        <button
                                             onClick={() =>
                                                  navigate(
                                                       "/admin/institucion"
                                                  )
                                             }
                                             className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                                        >
                                             Volver a instituciones
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     const getStatusClass = (status: string) =>
          status === "ACTIVE"
               ? "bg-green-100 text-green-800"
               : "bg-red-100 text-red-800";

     const getStatusText = (status: string) =>
          status === "ACTIVE" ? "Activo" : "Inactivo";

     return (
          <div className="max-w-7xl mx-auto">
               {/* Header */}
               <div className="mb-6">
                    <button
                         onClick={() =>
                              navigate("/admin/institucion")
                         }
                         className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                         <ArrowLeft className="h-4 w-4 mr-1" />
                         Volver a instituciones
                    </button>
                    <div className="flex justify-between items-start">
                         <div className="flex items-center">
                              {institution.logoUrl ? (
                                   <img
                                        src={institution.logoUrl}
                                        alt={institution.name}
                                        className="h-16 w-16 rounded-full object-cover mr-4"
                                   />
                              ) : (
                                   <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                                        <Building2 className="h-8 w-8 text-indigo-600" />
                                   </div>
                              )}
                              <div>
                                   <h1 className="text-3xl font-bold text-gray-900">
                                        {institution.name}
                                   </h1>
                                   <p className="text-sm text-gray-500 mt-1">
                                        {institution.institutionType} •{" "}
                                        {institution.institutionLevel}
                                   </p>
                                   <span
                                        className={`mt-2 inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                             institution.status
                                        )}`}
                                   >
                                        {getStatusText(institution.status)}
                                   </span>
                              </div>
                         </div>
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Vista Administrador
                         </span>
                    </div>
               </div>

               {/* Info Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Información General */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
                              Información General
                         </h2>
                         <dl className="space-y-3">
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Código
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.codeInstitution ||
                                             "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Código Modular
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.modularCode || "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Tipo
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.institutionType ||
                                             "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Nivel
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.institutionLevel ||
                                             "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Género
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.gender || "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        Tipo de Calificación
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.gradingType || "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        UGEL
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.ugel || "N/A"}
                                   </dd>
                              </div>
                              <div className="flex justify-between">
                                   <dt className="text-sm font-medium text-gray-500">
                                        DRE
                                   </dt>
                                   <dd className="text-sm text-gray-900">
                                        {institution.dre || "N/A"}
                                   </dd>
                              </div>
                              {institution.slogan && (
                                   <div className="pt-2 border-t">
                                        <dt className="text-sm font-medium text-gray-500 mb-1">
                                             Eslogan
                                        </dt>
                                        <dd className="text-sm text-gray-700 italic">
                                             "{institution.slogan}"
                                        </dd>
                                   </div>
                              )}
                         </dl>
                    </div>

                    {/* Director — ÚNICO CAMPO EDITABLE */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <UserCog className="h-5 w-5 mr-2 text-indigo-600" />
                              Director
                         </h2>

                         {!editingDirector ? (
                              <div className="space-y-4">
                                   <div className="bg-gray-50 p-4 rounded-lg">
                                        <dt className="text-sm font-medium text-gray-500 mb-1">
                                             ID del Director
                                        </dt>
                                        <dd className="text-sm text-gray-900 font-mono">
                                             {institution.directorId ||
                                                  "Sin asignar"}
                                        </dd>
                                   </div>
                                   {institution.status === "ACTIVE" && (
                                        <button
                                             onClick={
                                                  handleStartEditDirector
                                             }
                                             className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                        >
                                             <UserCog className="h-4 w-4 mr-2" />
                                             Cambiar Director
                                        </button>
                                   )}
                              </div>
                         ) : (
                              <div className="space-y-4">
                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             ID del Director
                                        </label>
                                        <input
                                             type="text"
                                             value={directorIdInput}
                                             onChange={(e) =>
                                                  setDirectorIdInput(
                                                       e.target.value
                                                  )
                                             }
                                             placeholder="UUID del director"
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                             Ingrese el UUID del nuevo
                                             director asignado
                                        </p>
                                   </div>
                                   <div className="flex space-x-2">
                                        <button
                                             onClick={handleSaveDirector}
                                             disabled={savingDirector}
                                             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                             <Save className="h-4 w-4 mr-2" />
                                             {savingDirector
                                                  ? "Guardando..."
                                                  : "Guardar"}
                                        </button>
                                        <button
                                             onClick={
                                                  handleCancelEditDirector
                                             }
                                             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                        >
                                             <X className="h-4 w-4 mr-2" />
                                             Cancelar
                                        </button>
                                   </div>
                              </div>
                         )}
                    </div>

                    {/* Dirección */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                              Dirección
                         </h2>
                         {institution.address ? (
                              <dl className="space-y-3">
                                   <div className="flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">
                                             Departamento
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                             {institution.address
                                                  .department || "N/A"}
                                        </dd>
                                   </div>
                                   <div className="flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">
                                             Provincia
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                             {institution.address
                                                  .province || "N/A"}
                                        </dd>
                                   </div>
                                   <div className="flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">
                                             Distrito
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                             {institution.address
                                                  .district || "N/A"}
                                        </dd>
                                   </div>
                                   <div className="flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">
                                             Urbanización
                                        </dt>
                                        <dd className="text-sm text-gray-900">
                                             {institution.address
                                                  .urbanization || "N/A"}
                                        </dd>
                                   </div>
                                   {institution.address.reference && (
                                        <div className="pt-2 border-t">
                                             <dt className="text-sm font-medium text-gray-500 mb-1">
                                                  Referencia
                                             </dt>
                                             <dd className="text-sm text-gray-700">
                                                  {
                                                       institution.address
                                                            .reference
                                                  }
                                             </dd>
                                        </div>
                                   )}
                              </dl>
                         ) : (
                              <p className="text-sm text-gray-400">
                                   Sin dirección registrada
                              </p>
                         )}
                    </div>

                    {/* Métodos de Contacto */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <Phone className="h-5 w-5 mr-2 text-indigo-600" />
                              Métodos de Contacto
                         </h2>
                         {institution.contactMethods &&
                         institution.contactMethods.length > 0 ? (
                              <div className="space-y-3">
                                   {institution.contactMethods.map(
                                        (contact, index) => (
                                             <div
                                                  key={index}
                                                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                                             >
                                                  <span className="text-xs font-medium text-gray-500 uppercase">
                                                       {contact.type}
                                                  </span>
                                                  <span className="text-sm text-gray-900">
                                                       {contact.value}
                                                  </span>
                                             </div>
                                        )
                                   )}
                              </div>
                         ) : (
                              <p className="text-sm text-gray-400">
                                   Sin métodos de contacto
                              </p>
                         )}
                    </div>
               </div>

               {/* Horarios */}
               <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                         <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                         Horarios
                    </h2>
                    {institution.schedules &&
                    institution.schedules.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {institution.schedules.map(
                                   (schedule, index) => (
                                        <div
                                             key={index}
                                             className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md"
                                        >
                                             <span className="text-sm font-medium text-gray-700">
                                                  {schedule.shift}
                                             </span>
                                             <span className="text-sm text-gray-600">
                                                  {schedule.startTime} -{" "}
                                                  {schedule.endTime}
                                             </span>
                                        </div>
                                   )
                              )}
                         </div>
                    ) : (
                         <p className="text-sm text-gray-400">
                              Sin horarios registrados
                         </p>
                    )}
               </div>

               {/* Aulas (solo lectura) */}
               <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                         <Users className="h-5 w-5 mr-2 text-indigo-600" />
                         Aulas ({institution.classrooms?.length || 0})
                    </h2>
                    {institution.classrooms &&
                    institution.classrooms.length > 0 ? (
                         <div className="overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                   <thead className="bg-gray-50">
                                        <tr>
                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                  Nombre
                                             </th>
                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                  Edad/Grupo
                                             </th>
                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                  Capacidad
                                             </th>
                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                  Color
                                             </th>
                                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                  Estado
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-gray-200">
                                        {institution.classrooms.map(
                                             (classroom) => (
                                                  <tr
                                                       key={classroom.id}
                                                       className="hover:bg-gray-50"
                                                  >
                                                       <td className="px-4 py-3 text-sm text-gray-900">
                                                            {
                                                                 classroom.classroomName
                                                            }
                                                       </td>
                                                       <td className="px-4 py-3 text-sm text-gray-600">
                                                            {
                                                                 classroom.classroomAge
                                                            }
                                                       </td>
                                                       <td className="px-4 py-3 text-sm text-gray-600">
                                                            {
                                                                 classroom.capacity
                                                            }
                                                       </td>
                                                       <td className="px-4 py-3">
                                                            <div className="flex items-center space-x-2">
                                                                 {classroom.color && (
                                                                      <span
                                                                           className="inline-block w-4 h-4 rounded-full border border-gray-300"
                                                                           style={{
                                                                                backgroundColor:
                                                                                     classroom.color,
                                                                           }}
                                                                      />
                                                                 )}
                                                                 <span className="text-sm text-gray-600">
                                                                      {classroom.color ||
                                                                           "N/A"}
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="px-4 py-3">
                                                            <span
                                                                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                                                      classroom.status
                                                                 )}`}
                                                            >
                                                                 {getStatusText(
                                                                      classroom.status
                                                                 )}
                                                            </span>
                                                       </td>
                                                  </tr>
                                             )
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    ) : (
                         <p className="text-sm text-gray-400">
                              Sin aulas registradas
                         </p>
                    )}
               </div>
          </div>
     );
}
