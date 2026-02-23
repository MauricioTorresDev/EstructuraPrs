/**
 * Componente: ClassroomFormModal
 * Modal para crear o editar un aula
 */

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
     Classroom,
     CreateClassroomRequest,
     UpdateClassroomRequest,
} from "../models/Institution.interface";

interface ClassroomFormModalProps {
     readonly isOpen: boolean;
     readonly onClose: () => void;
     readonly onSave: (
          data: CreateClassroomRequest | UpdateClassroomRequest
     ) => void;
     readonly classroom?: Classroom | null;
     readonly institutionId: string;
     readonly loading?: boolean;
}

export function ClassroomFormModal({
     isOpen,
     onClose,
     onSave,
     classroom,
     institutionId,
     loading = false,
}: ClassroomFormModalProps) {
     const isEditing = !!classroom;

     const [formData, setFormData] = useState({
          classroomName: "",
          classroomAge: "",
          capacity: 20,
          color: "#6366f1",
     });

     const [errors, setErrors] = useState<Record<string, string>>({});

     useEffect(() => {
          if (classroom) {
               setFormData({
                    classroomName: classroom.classroomName || "",
                    classroomAge: classroom.classroomAge || "",
                    capacity: classroom.capacity || 20,
                    color: classroom.color || "#6366f1",
               });
          } else {
               setFormData({
                    classroomName: "",
                    classroomAge: "",
                    capacity: 20,
                    color: "#6366f1",
               });
          }
          setErrors({});
     }, [classroom, isOpen]);

     const validate = (): boolean => {
          const newErrors: Record<string, string> = {};

          if (!formData.classroomName.trim()) {
               newErrors.classroomName =
                    "El nombre del aula es requerido";
          }
          if (!formData.classroomAge.trim()) {
               newErrors.classroomAge =
                    "La edad/grupo es requerida";
          }
          if (
               formData.capacity <= 0 ||
               formData.capacity > 30
          ) {
               newErrors.capacity =
                    "La capacidad debe ser entre 1 y 30";
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!validate()) return;

          if (isEditing) {
               const updateData: UpdateClassroomRequest = {
                    classroomName: formData.classroomName,
                    classroomAge: formData.classroomAge,
                    capacity: formData.capacity,
                    color: formData.color,
               };
               onSave(updateData);
          } else {
               const createData: CreateClassroomRequest = {
                    institutionId,
                    classroomName: formData.classroomName,
                    classroomAge: formData.classroomAge,
                    capacity: formData.capacity,
                    color: formData.color,
               };
               onSave(createData);
          }
     };

     const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
     ) => {
          const { name, value, type } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]:
                    type === "number" ? parseInt(value) || 0 : value,
          }));
          if (errors[name]) {
               setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy[name];
                    return copy;
               });
          }
     };

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 z-50 overflow-y-auto">
               <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                         className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                         onClick={onClose}
                    />

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                         <form onSubmit={handleSubmit}>
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                   <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                             {isEditing
                                                  ? "Editar Aula"
                                                  : "Nueva Aula"}
                                        </h3>
                                        <button
                                             type="button"
                                             onClick={onClose}
                                             className="text-gray-400 hover:text-gray-600"
                                        >
                                             <X className="h-5 w-5" />
                                        </button>
                                   </div>

                                   <div className="space-y-4">
                                        <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                                  Nombre del Aula *
                                             </label>
                                             <input
                                                  type="text"
                                                  name="classroomName"
                                                  value={
                                                       formData.classroomName
                                                  }
                                                  onChange={handleChange}
                                                  placeholder="Ej: Aula Roja"
                                                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                                       errors.classroomName
                                                            ? "border-red-300"
                                                            : "border-gray-300"
                                                  }`}
                                             />
                                             {errors.classroomName && (
                                                  <p className="mt-1 text-xs text-red-600">
                                                       {errors.classroomName}
                                                  </p>
                                             )}
                                        </div>

                                        <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                                  Edad / Grupo *
                                             </label>
                                             <select
                                                  name="classroomAge"
                                                  value={
                                                       formData.classroomAge
                                                  }
                                                  onChange={handleChange}
                                                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                                       errors.classroomAge
                                                            ? "border-red-300"
                                                            : "border-gray-300"
                                                  }`}
                                             >
                                                  <option value="">
                                                       Seleccionar edad
                                                  </option>
                                                  <option value="3 años">
                                                       3 años
                                                  </option>
                                                  <option value="4 años">
                                                       4 años
                                                  </option>
                                                  <option value="5 años">
                                                       5 años
                                                  </option>
                                                  <option value="Mixto">
                                                       Mixto
                                                  </option>
                                             </select>
                                             {errors.classroomAge && (
                                                  <p className="mt-1 text-xs text-red-600">
                                                       {errors.classroomAge}
                                                  </p>
                                             )}
                                        </div>

                                        <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                                  Capacidad *{" "}
                                                  <span className="text-xs text-gray-400">
                                                       (1-30)
                                                  </span>
                                             </label>
                                             <input
                                                  type="number"
                                                  name="capacity"
                                                  min={1}
                                                  max={30}
                                                  value={formData.capacity}
                                                  onChange={handleChange}
                                                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                                       errors.capacity
                                                            ? "border-red-300"
                                                            : "border-gray-300"
                                                  }`}
                                             />
                                             {errors.capacity && (
                                                  <p className="mt-1 text-xs text-red-600">
                                                       {errors.capacity}
                                                  </p>
                                             )}
                                        </div>

                                        <div>
                                             <label className="block text-sm font-medium text-gray-700 mb-1">
                                                  Color
                                             </label>
                                             <div className="flex items-center space-x-3">
                                                  <input
                                                       type="color"
                                                       name="color"
                                                       value={
                                                            formData.color
                                                       }
                                                       onChange={handleChange}
                                                       className="h-10 w-14 border border-gray-300 rounded cursor-pointer"
                                                  />
                                                  <input
                                                       type="text"
                                                       name="color"
                                                       value={
                                                            formData.color
                                                       }
                                                       onChange={handleChange}
                                                       className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                       placeholder="#6366f1"
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                   <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                   >
                                        {loading
                                             ? "Guardando..."
                                             : isEditing
                                             ? "Actualizar"
                                             : "Crear Aula"}
                                   </button>
                                   <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                   >
                                        Cancelar
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
}
