/**
 * Página: InstitutionCreatePage
 * Formulario para crear una nueva institución
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Plus, Trash2 } from "lucide-react";
import { institutionService } from "../service/Institution.service";
import {
     showSuccessAlert,
     showErrorAlert,
     showLoadingAlert,
     closeAlert,
} from "../../../shared/utils/sweetAlert";
import type {
     CreateInstitutionRequest,
     Address,
     ContactMethod,
     Schedule,
} from "../models/Institution.interface";

const emptyAddress: Address = {
     department: "",
     province: "",
     district: "",
     urbanization: "",
     reference: "",
};

export function InstitutionCreatePage() {
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [errors, setErrors] = useState<Record<string, string>>({});

     const [formData, setFormData] = useState<CreateInstitutionRequest>({
          codeInstitution: "",
          modularCode: "",
          name: "",
          institutionType: "",
          institutionLevel: "INICIAL",
          gender: "",
          slogan: "",
          logoUrl: "",
          address: { ...emptyAddress },
          contactMethods: [{ type: "TELEFONO", value: "" }],
          schedules: [{ shift: "MAÑANA", startTime: "08:00", endTime: "13:00" }],
          gradingType: "",
          classroomType: "",
          ugel: "",
          dre: "",
          directorId: "",
     });

     // --- Handlers de cambios ---

     const handleChange = (
          e: React.ChangeEvent<
               HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
     ) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
          if (errors[name]) {
               setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy[name];
                    return copy;
               });
          }
     };

     const handleAddressChange = (
          e: React.ChangeEvent<HTMLInputElement>
     ) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               address: { ...prev.address, [name]: value },
          }));
     };

     // Contact methods
     const handleContactChange = (
          index: number,
          field: keyof ContactMethod,
          value: string
     ) => {
          setFormData((prev) => {
               const updated = [...prev.contactMethods];
               updated[index] = { ...updated[index], [field]: value };
               return { ...prev, contactMethods: updated };
          });
     };

     const addContactMethod = () => {
          setFormData((prev) => ({
               ...prev,
               contactMethods: [
                    ...prev.contactMethods,
                    { type: "TELEFONO", value: "" },
               ],
          }));
     };

     const removeContactMethod = (index: number) => {
          setFormData((prev) => ({
               ...prev,
               contactMethods: prev.contactMethods.filter(
                    (_, i) => i !== index
               ),
          }));
     };

     // Schedules
     const handleScheduleChange = (
          index: number,
          field: keyof Schedule,
          value: string
     ) => {
          setFormData((prev) => {
               const updated = [...prev.schedules];
               updated[index] = { ...updated[index], [field]: value };
               return { ...prev, schedules: updated };
          });
     };

     const addSchedule = () => {
          setFormData((prev) => ({
               ...prev,
               schedules: [
                    ...prev.schedules,
                    { shift: "MAÑANA", startTime: "08:00", endTime: "13:00" },
               ],
          }));
     };

     const removeSchedule = (index: number) => {
          setFormData((prev) => ({
               ...prev,
               schedules: prev.schedules.filter((_, i) => i !== index),
          }));
     };

     // --- Validación ---

     const validate = (): boolean => {
          const newErrors: Record<string, string> = {};

          if (!formData.codeInstitution.trim())
               newErrors.codeInstitution =
                    "El código de institución es requerido";
          if (!formData.name.trim())
               newErrors.name = "El nombre es requerido";
          if (!formData.institutionType.trim())
               newErrors.institutionType =
                    "El tipo de institución es requerido";

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     // --- Submit ---

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!validate()) return;

          try {
               setLoading(true);
               showLoadingAlert("Creando institución...");
               await institutionService.create(formData);
               closeAlert();
               showSuccessAlert(
                    "Institución creada",
                    "La institución se ha registrado correctamente"
               );
               navigate("/institucion");
          } catch (err) {
               closeAlert();
               showErrorAlert(
                    "Error al crear",
                    err instanceof Error
                         ? err.message
                         : "Error desconocido"
               );
          } finally {
               setLoading(false);
          }
     };

     // --- Render helpers ---

     const inputClass = (field: string) =>
          `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
               errors[field] ? "border-red-300" : "border-gray-300"
          }`;

     return (
          <div className="max-w-4xl mx-auto">
               {/* Header */}
               <div className="mb-6">
                    <button
                         onClick={() => navigate("/institucion")}
                         className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                         <ArrowLeft className="h-4 w-4 mr-1" />
                         Volver a instituciones
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                         <Building2 className="h-8 w-8 mr-3 text-indigo-600" />
                         Nueva Institución
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                         Complete los datos para registrar una nueva
                         institución educativa
                    </p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Información General */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
                              Información General
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código de Institución *
                                   </label>
                                   <input
                                        type="text"
                                        name="codeInstitution"
                                        value={formData.codeInstitution}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "codeInstitution"
                                        )}
                                        placeholder="Ej: IE-001"
                                   />
                                   {errors.codeInstitution && (
                                        <p className="mt-1 text-xs text-red-600">
                                             {errors.codeInstitution}
                                        </p>
                                   )}
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código Modular
                                   </label>
                                   <input
                                        type="text"
                                        name="modularCode"
                                        value={formData.modularCode}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "modularCode"
                                        )}
                                        placeholder="Ej: 0123456"
                                   />
                              </div>
                              <div className="md:col-span-2">
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre de la Institución *
                                   </label>
                                   <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClass("name")}
                                        placeholder="Nombre completo de la institución"
                                   />
                                   {errors.name && (
                                        <p className="mt-1 text-xs text-red-600">
                                             {errors.name}
                                        </p>
                                   )}
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Institución *
                                   </label>
                                   <select
                                        name="institutionType"
                                        value={formData.institutionType}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "institutionType"
                                        )}
                                   >
                                        <option value="">Seleccionar</option>
                                        <option value="PUBLICA">
                                             Pública
                                        </option>
                                        <option value="PRIVADA">
                                             Privada
                                        </option>
                                        <option value="CONVENIO">
                                             Convenio
                                        </option>
                                   </select>
                                   {errors.institutionType && (
                                        <p className="mt-1 text-xs text-red-600">
                                             {errors.institutionType}
                                        </p>
                                   )}
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nivel Educativo
                                   </label>
                                   <select
                                        name="institutionLevel"
                                        value={formData.institutionLevel}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "institutionLevel"
                                        )}
                                   >
                                        <option value="INICIAL">
                                             Inicial
                                        </option>
                                        <option value="PRIMARIA">
                                             Primaria
                                        </option>
                                        <option value="SECUNDARIA">
                                             Secundaria
                                        </option>
                                   </select>
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Género
                                   </label>
                                   <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={inputClass("gender")}
                                   >
                                        <option value="">Seleccionar</option>
                                        <option value="MIXTO">Mixto</option>
                                        <option value="MASCULINO">
                                             Masculino
                                        </option>
                                        <option value="FEMENINO">
                                             Femenino
                                        </option>
                                   </select>
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Calificación
                                   </label>
                                   <select
                                        name="gradingType"
                                        value={formData.gradingType}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "gradingType"
                                        )}
                                   >
                                        <option value="">Seleccionar</option>
                                        <option value="LITERAL">
                                             Literal (AD, A, B, C)
                                        </option>
                                        <option value="NUMERICO">
                                             Numérico (0-20)
                                        </option>
                                   </select>
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Aula
                                   </label>
                                   <input
                                        type="text"
                                        name="classroomType"
                                        value={formData.classroomType}
                                        onChange={handleChange}
                                        className={inputClass(
                                             "classroomType"
                                        )}
                                        placeholder="Ej: Presencial"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        UGEL
                                   </label>
                                   <input
                                        type="text"
                                        name="ugel"
                                        value={formData.ugel}
                                        onChange={handleChange}
                                        className={inputClass("ugel")}
                                        placeholder="Ej: UGEL 01"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        DRE
                                   </label>
                                   <input
                                        type="text"
                                        name="dre"
                                        value={formData.dre}
                                        onChange={handleChange}
                                        className={inputClass("dre")}
                                        placeholder="Ej: DRE Lima Metropolitana"
                                   />
                              </div>
                              <div className="md:col-span-2">
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Eslogan
                                   </label>
                                   <textarea
                                        name="slogan"
                                        value={formData.slogan}
                                        onChange={handleChange}
                                        rows={2}
                                        className={inputClass("slogan")}
                                        placeholder="Eslogan de la institución"
                                   />
                              </div>
                              <div className="md:col-span-2">
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL del Logo
                                   </label>
                                   <input
                                        type="url"
                                        name="logoUrl"
                                        value={formData.logoUrl}
                                        onChange={handleChange}
                                        className={inputClass("logoUrl")}
                                        placeholder="https://ejemplo.com/logo.png"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Dirección */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
                              Dirección
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Departamento
                                   </label>
                                   <input
                                        type="text"
                                        name="department"
                                        value={
                                             formData.address.department
                                        }
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: Lima"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Provincia
                                   </label>
                                   <input
                                        type="text"
                                        name="province"
                                        value={formData.address.province}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: Lima"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Distrito
                                   </label>
                                   <input
                                        type="text"
                                        name="district"
                                        value={formData.address.district}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: San Isidro"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Urbanización
                                   </label>
                                   <input
                                        type="text"
                                        name="urbanization"
                                        value={
                                             formData.address.urbanization
                                        }
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: Urb. Los Olivos"
                                   />
                              </div>
                              <div className="md:col-span-2">
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Referencia
                                   </label>
                                   <input
                                        type="text"
                                        name="reference"
                                        value={formData.address.reference}
                                        onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: Frente al parque"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Métodos de Contacto */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold text-gray-800">
                                   Métodos de Contacto
                              </h2>
                              <button
                                   type="button"
                                   onClick={addContactMethod}
                                   className="inline-flex items-center px-3 py-1.5 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                              >
                                   <Plus className="h-3 w-3 mr-1" />
                                   Agregar
                              </button>
                         </div>
                         {formData.contactMethods.map((contact, index) => (
                              <div
                                   key={index}
                                   className="flex items-end gap-3 mb-3"
                              >
                                   <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             Tipo
                                        </label>
                                        <select
                                             value={contact.type}
                                             onChange={(e) =>
                                                  handleContactChange(
                                                       index,
                                                       "type",
                                                       e.target.value
                                                  )
                                             }
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                             <option value="TELEFONO">
                                                  Teléfono
                                             </option>
                                             <option value="EMAIL">
                                                  Email
                                             </option>
                                             <option value="CELULAR">
                                                  Celular
                                             </option>
                                             <option value="WHATSAPP">
                                                  WhatsApp
                                             </option>
                                        </select>
                                   </div>
                                   <div className="flex-[2]">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             Valor
                                        </label>
                                        <input
                                             type="text"
                                             value={contact.value}
                                             onChange={(e) =>
                                                  handleContactChange(
                                                       index,
                                                       "value",
                                                       e.target.value
                                                  )
                                             }
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                             placeholder="Número o dirección"
                                        />
                                   </div>
                                   {formData.contactMethods.length > 1 && (
                                        <button
                                             type="button"
                                             onClick={() =>
                                                  removeContactMethod(index)
                                             }
                                             className="inline-flex items-center px-2 py-2 border border-red-300 rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                                        >
                                             <Trash2 className="h-4 w-4" />
                                        </button>
                                   )}
                              </div>
                         ))}
                    </div>

                    {/* Horarios */}
                    <div className="bg-white shadow rounded-lg p-6">
                         <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold text-gray-800">
                                   Horarios
                              </h2>
                              <button
                                   type="button"
                                   onClick={addSchedule}
                                   className="inline-flex items-center px-3 py-1.5 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                              >
                                   <Plus className="h-3 w-3 mr-1" />
                                   Agregar
                              </button>
                         </div>
                         {formData.schedules.map((schedule, index) => (
                              <div
                                   key={index}
                                   className="flex items-end gap-3 mb-3"
                              >
                                   <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             Turno
                                        </label>
                                        <select
                                             value={schedule.shift}
                                             onChange={(e) =>
                                                  handleScheduleChange(
                                                       index,
                                                       "shift",
                                                       e.target.value
                                                  )
                                             }
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                             <option value="MAÑANA">
                                                  Mañana
                                             </option>
                                             <option value="TARDE">
                                                  Tarde
                                             </option>
                                             <option value="NOCHE">
                                                  Noche
                                             </option>
                                        </select>
                                   </div>
                                   <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             Hora Inicio
                                        </label>
                                        <input
                                             type="time"
                                             value={schedule.startTime}
                                             onChange={(e) =>
                                                  handleScheduleChange(
                                                       index,
                                                       "startTime",
                                                       e.target.value
                                                  )
                                             }
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                   </div>
                                   <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                             Hora Fin
                                        </label>
                                        <input
                                             type="time"
                                             value={schedule.endTime}
                                             onChange={(e) =>
                                                  handleScheduleChange(
                                                       index,
                                                       "endTime",
                                                       e.target.value
                                                  )
                                             }
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                   </div>
                                   {formData.schedules.length > 1 && (
                                        <button
                                             type="button"
                                             onClick={() =>
                                                  removeSchedule(index)
                                             }
                                             className="inline-flex items-center px-2 py-2 border border-red-300 rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                                        >
                                             <Trash2 className="h-4 w-4" />
                                        </button>
                                   )}
                              </div>
                         ))}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-3">
                         <button
                              type="button"
                              onClick={() => navigate("/institucion")}
                              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         >
                              Cancelar
                         </button>
                         <button
                              type="submit"
                              disabled={loading}
                              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                              {loading
                                   ? "Creando..."
                                   : "Crear Institución"}
                         </button>
                    </div>
               </form>
          </div>
     );
}
