/**
 * Página: InstitutionDetailPage
 * Muestra el detalle de una institución con sus aulas
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
     ArrowLeft,
     Building2,
     Edit3,
     MapPin,
     Phone,
     Clock,
     Plus,
     Users,
} from "lucide-react";
import { institutionService } from "../service/Institution.service";
import { classroomService } from "../service/Institution.service";
import { ClassroomList } from "../components/ClassroomList";
import { ClassroomFormModal } from "../components/ClassroomFormModal";
import {
     showSuccessAlert,
     showErrorAlert,
     showLoadingAlert,
     closeAlert,
} from "../../../shared/utils/sweetAlert";
import type {
     InstitutionCompleteResponse,
     Classroom,
     CreateClassroomRequest,
     UpdateClassroomRequest,
} from "../models/Institution.interface";

export function InstitutionDetailPage() {
     const { institutionId } = useParams<{
          institutionId: string;
     }>();
     const navigate = useNavigate();

     const [institution, setInstitution] =
          useState<InstitutionCompleteResponse | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     // Classroom modal state
     const [showClassroomModal, setShowClassroomModal] = useState(false);
     const [editingClassroom, setEditingClassroom] =
          useState<Classroom | null>(null);
     const [savingClassroom, setSavingClassroom] = useState(false);

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

     // ---- Classroom CRUD ----

     const handleCreateClassroom = () => {
          setEditingClassroom(null);
          setShowClassroomModal(true);
     };

     const handleEditClassroom = (classroom: Classroom) => {
          setEditingClassroom(classroom);
          setShowClassroomModal(true);
     };

     const handleSaveClassroom = async (
          data: CreateClassroomRequest | UpdateClassroomRequest
     ) => {
          try {
               setSavingClassroom(true);
               showLoadingAlert(
                    editingClassroom
                         ? "Actualizando aula..."
                         : "Creando aula..."
               );

               if (editingClassroom) {
                    await classroomService.update(
                         editingClassroom.id,
                         data as UpdateClassroomRequest
                    );
               } else {
                    await classroomService.create(
                         data as CreateClassroomRequest
                    );
               }

               closeAlert();
               showSuccessAlert(
                    editingClassroom
                         ? "Aula actualizada"
                         : "Aula creada",
                    editingClassroom
                         ? "El aula se ha actualizado correctamente"
                         : "El aula se ha creado correctamente"
               );
               setShowClassroomModal(false);
               setEditingClassroom(null);
               fetchInstitution(); // Refresh
          } catch (err) {
               closeAlert();
               showErrorAlert(
                    "Error",
                    err instanceof Error
                         ? err.message
                         : "Error desconocido"
               );
          } finally {
               setSavingClassroom(false);
          }
     };

     const handleDeleteClassroom = async (id: string) => {
          try {
               showLoadingAlert("Eliminando aula...");
               await classroomService.delete(id);
               closeAlert();
               showSuccessAlert(
                    "Aula eliminada",
                    "El aula ha sido desactivada exitosamente"
               );
               fetchInstitution();
          } catch (err) {
               closeAlert();
               showErrorAlert(
                    "Error al eliminar",
                    err instanceof Error
                         ? err.message
                         : "Error desconocido"
               );
          }
     };

     const handleRestoreClassroom = async (id: string) => {
          try {
               showLoadingAlert("Restaurando aula...");
               await classroomService.restore(id);
               closeAlert();
               showSuccessAlert(
                    "Aula restaurada",
                    "El aula ha sido restaurada exitosamente"
               );
               fetchInstitution();
          } catch (err) {
               closeAlert();
               showErrorAlert(
                    "Error al restaurar",
                    err instanceof Error
                         ? err.message
                         : "Error desconocido"
               );
          }
     };

     // ---- Loading / Error states ----

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
                                                  navigate("/institucion")
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
                         onClick={() => navigate("/institucion")}
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
                         {institution.status === "ACTIVE" && (
                              <button
                                   onClick={() =>
                                        navigate(
                                             `/institucion/${institutionId}/editar`
                                        )
                                   }
                                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                   <Edit3 className="h-4 w-4 mr-2" />
                                   Editar
                              </button>
                         )}
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

                    {/* Horarios */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                              Horarios
                         </h2>
                         {institution.schedules &&
                         institution.schedules.length > 0 ? (
                              <div className="space-y-3">
                                   {institution.schedules.map(
                                        (schedule, index) => (
                                             <div
                                                  key={index}
                                                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                                             >
                                                  <span className="text-sm font-medium text-gray-700">
                                                       {schedule.shift}
                                                  </span>
                                                  <span className="text-sm text-gray-600">
                                                       {schedule.startTime}{" "}
                                                       -{" "}
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
               </div>

               {/* Aulas */}
               <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                              <Users className="h-6 w-6 mr-2 text-indigo-600" />
                              Aulas ({institution.classrooms?.length || 0})
                         </h2>
                         {institution.status === "ACTIVE" && (
                              <button
                                   onClick={handleCreateClassroom}
                                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                   <Plus className="h-4 w-4 mr-2" />
                                   Nueva Aula
                              </button>
                         )}
                    </div>

                    <ClassroomList
                         items={institution.classrooms || []}
                         onDelete={handleDeleteClassroom}
                         onRestore={handleRestoreClassroom}
                         onEdit={handleEditClassroom}
                    />
               </div>

               {/* Classroom Modal */}
               <ClassroomFormModal
                    isOpen={showClassroomModal}
                    onClose={() => {
                         setShowClassroomModal(false);
                         setEditingClassroom(null);
                    }}
                    onSave={handleSaveClassroom}
                    classroom={editingClassroom}
                    institutionId={institutionId!}
                    loading={savingClassroom}
               />
          </div>
     );
}
