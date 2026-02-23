/**
 * Componente: ClassroomList
 * Muestra la lista de aulas de una institución con acciones CRUD
 */

import { Eye, Edit3, Trash2, RotateCcw, Users } from "lucide-react";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/Pagination";
import {
     showDeleteConfirm,
     showRestoreConfirm,
} from "../../../shared/utils/sweetAlert";
import type { Classroom } from "../models/Institution.interface";

interface ClassroomListProps {
     readonly items: Classroom[];
     readonly onDelete?: (id: string) => void;
     readonly onRestore?: (id: string) => void;
     readonly onEdit?: (classroom: Classroom) => void;
     readonly onView?: (classroom: Classroom) => void;
}

export function ClassroomList({
     items,
     onDelete,
     onRestore,
     onEdit,
     onView,
}: ClassroomListProps) {
     const {
          currentPage,
          totalPages,
          paginatedData,
          goToPage,
          hasNext,
          hasPrevious,
          totalItems,
     } = usePagination({ data: items || [], itemsPerPage: 8 });

     const handleDelete = async (id: string, name: string) => {
          const result = await showDeleteConfirm(name);
          if (result.isConfirmed) {
               onDelete?.(id);
          }
     };

     const handleRestore = async (id: string, name: string) => {
          const result = await showRestoreConfirm(name);
          if (result.isConfirmed) {
               onRestore?.(id);
          }
     };

     const getStatusClass = (status: string) => {
          return status === "ACTIVE"
               ? "bg-green-100 text-green-800"
               : "bg-red-100 text-red-800";
     };

     const getStatusText = (status: string) => {
          return status === "ACTIVE" ? "Activo" : "Inactivo";
     };

     const getColorDot = (color: string | null) => {
          if (!color) return null;
          return (
               <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
               />
          );
     };

     return (
          <>
               <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                              <tr>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aula
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Edad / Grupo
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Capacidad
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Color
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                   </th>
                                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                   </th>
                              </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                              {paginatedData.map((classroom) => (
                                   <tr
                                        key={classroom.id}
                                        className="hover:bg-gray-50"
                                   >
                                        <td className="px-6 py-4">
                                             <div className="flex items-center">
                                                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                       <Users className="h-4 w-4 text-purple-600" />
                                                  </div>
                                                  <div className="ml-3">
                                                       <div className="text-sm font-medium text-gray-900">
                                                            {classroom.classroomName}
                                                       </div>
                                                  </div>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                             {classroom.classroomAge ||
                                                  "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex items-center text-sm text-gray-600">
                                                  <Users className="h-4 w-4 mr-1 text-gray-400" />
                                                  {classroom.capacity ?? "N/A"}
                                             </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex items-center space-x-2">
                                                  {getColorDot(
                                                       classroom.color
                                                  )}
                                                  <span className="text-sm text-gray-600">
                                                       {classroom.color ||
                                                            "N/A"}
                                                  </span>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
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
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                             <div className="flex justify-end space-x-2">
                                                  {onView && (
                                                       <button
                                                            onClick={() =>
                                                                 onView(
                                                                      classroom
                                                                 )
                                                            }
                                                            className="inline-flex items-center px-2 py-1 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                                                            title="Ver detalles"
                                                       >
                                                            <Eye className="h-4 w-4" />
                                                       </button>
                                                  )}
                                                  {classroom.status ===
                                                       "ACTIVE" && (
                                                       <>
                                                            {onEdit && (
                                                                 <button
                                                                      onClick={() =>
                                                                           onEdit(
                                                                                classroom
                                                                           )
                                                                      }
                                                                      className="inline-flex items-center px-2 py-1 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                                                                      title="Editar aula"
                                                                 >
                                                                      <Edit3 className="h-4 w-4" />
                                                                 </button>
                                                            )}
                                                            <button
                                                                 onClick={() =>
                                                                      handleDelete(
                                                                           classroom.id,
                                                                           classroom.classroomName
                                                                      )
                                                                 }
                                                                 className="inline-flex items-center px-2 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                                                                 title="Eliminar aula"
                                                            >
                                                                 <Trash2 className="h-4 w-4" />
                                                            </button>
                                                       </>
                                                  )}
                                                  {classroom.status ===
                                                       "INACTIVE" && (
                                                       <button
                                                            onClick={() =>
                                                                 handleRestore(
                                                                      classroom.id,
                                                                      classroom.classroomName
                                                                 )
                                                            }
                                                            className="inline-flex items-center px-2 py-1 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors duration-200"
                                                            title="Restaurar aula"
                                                       >
                                                            <RotateCcw className="h-4 w-4" />
                                                       </button>
                                                  )}
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>

                    {paginatedData.length === 0 && (
                         <div className="text-center py-12">
                              <div className="text-gray-500">
                                   No se encontraron aulas
                              </div>
                         </div>
                    )}
               </div>

               <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                    totalItems={totalItems}
                    itemsPerPage={8}
               />
          </>
     );
}
