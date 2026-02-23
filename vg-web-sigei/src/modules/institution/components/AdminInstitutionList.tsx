/**
 * Componente: AdminInstitutionList
 * Lista de instituciones para vista de administrador
 * Solo acciones: Ver detalle, Eliminar (soft-delete), Restaurar
 */

import { useNavigate } from "react-router-dom";
import { Eye, Trash2, RotateCcw, MapPin } from "lucide-react";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Pagination } from "../../../shared/components/Pagination";
import {
     showDeleteConfirm,
     showRestoreConfirm,
} from "../../../shared/utils/sweetAlert";
import type { Institution } from "../models/Institution.interface";

interface AdminInstitutionListProps {
     readonly items: Institution[];
     readonly onDelete?: (id: string) => void;
     readonly onRestore?: (id: string) => void;
}

export function AdminInstitutionList({
     items,
     onDelete,
     onRestore,
}: AdminInstitutionListProps) {
     const navigate = useNavigate();

     const {
          currentPage,
          totalPages,
          paginatedData,
          goToPage,
          hasNext,
          hasPrevious,
          totalItems,
     } = usePagination({ data: items || [], itemsPerPage: 8 });

     const handleView = (id: string) => {
          navigate(`/admin/institucion/${id}`);
     };

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

     const getStatusClass = (status: string) =>
          status === "ACTIVE"
               ? "bg-green-100 text-green-800"
               : "bg-red-100 text-red-800";

     const getStatusText = (status: string) =>
          status === "ACTIVE" ? "Activo" : "Inactivo";

     return (
          <>
               <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                              <tr>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Institución
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Códigos
                                   </th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ubicación
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
                              {paginatedData.map((institution) => (
                                   <tr
                                        key={institution.id}
                                        className="hover:bg-gray-50"
                                   >
                                        <td className="px-6 py-4">
                                             <div className="flex items-center">
                                                  {institution.logoUrl ? (
                                                       <img
                                                            src={
                                                                 institution.logoUrl
                                                            }
                                                            alt={
                                                                 institution.name
                                                            }
                                                            className="h-10 w-10 rounded-full object-cover"
                                                       />
                                                  ) : (
                                                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                            <span className="text-indigo-600 font-bold text-sm">
                                                                 {institution.name
                                                                      .charAt(0)
                                                                      .toUpperCase()}
                                                            </span>
                                                       </div>
                                                  )}
                                                  <div className="ml-4">
                                                       <div className="text-sm font-medium text-gray-900">
                                                            {institution.name}
                                                       </div>
                                                       <div className="text-xs text-gray-500">
                                                            {institution.institutionType ||
                                                                 "N/A"}{" "}
                                                            •{" "}
                                                            {institution.institutionLevel ||
                                                                 "N/A"}
                                                       </div>
                                                  </div>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex flex-col">
                                                  <div className="text-sm text-gray-900">
                                                       <span className="font-medium">
                                                            Código:
                                                       </span>{" "}
                                                       {institution.codeInstitution ||
                                                            "N/A"}
                                                  </div>
                                                  <div className="text-sm text-gray-500">
                                                       <span className="font-medium">
                                                            Modular:
                                                       </span>{" "}
                                                       {institution.modularCode ||
                                                            "N/A"}
                                                  </div>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4">
                                             <div className="flex items-start">
                                                  <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                                                  <div className="text-sm text-gray-600">
                                                       {institution.address ? (
                                                            <>
                                                                 <div>
                                                                      {institution
                                                                           .address
                                                                           .district ||
                                                                           "N/A"}
                                                                      ,{" "}
                                                                      {institution
                                                                           .address
                                                                           .province ||
                                                                           "N/A"}
                                                                 </div>
                                                                 <div className="text-xs text-gray-400">
                                                                      {institution
                                                                           .address
                                                                           .department ||
                                                                           ""}
                                                                 </div>
                                                            </>
                                                       ) : (
                                                            <span className="text-gray-400">
                                                                 Sin dirección
                                                            </span>
                                                       )}
                                                  </div>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             <span
                                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                                       institution.status
                                                  )}`}
                                             >
                                                  {getStatusText(
                                                       institution.status
                                                  )}
                                             </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                             <div className="flex justify-end space-x-2">
                                                  <button
                                                       onClick={() =>
                                                            handleView(
                                                                 institution.id
                                                            )
                                                       }
                                                       className="inline-flex items-center px-2 py-1 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                                                       title="Ver detalles"
                                                  >
                                                       <Eye className="h-4 w-4 mr-1" />
                                                  </button>
                                                  {institution.status ===
                                                       "ACTIVE" && (
                                                       <button
                                                            onClick={() =>
                                                                 handleDelete(
                                                                      institution.id,
                                                                      institution.name
                                                                 )
                                                            }
                                                            className="inline-flex items-center px-2 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                                                            title="Eliminar institución"
                                                       >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                       </button>
                                                  )}
                                                  {institution.status ===
                                                       "INACTIVE" && (
                                                       <button
                                                            onClick={() =>
                                                                 handleRestore(
                                                                      institution.id,
                                                                      institution.name
                                                                 )
                                                            }
                                                            className="inline-flex items-center px-2 py-1 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors duration-200"
                                                            title="Restaurar institución"
                                                       >
                                                            <RotateCcw className="h-4 w-4 mr-1" />
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
                                   No se encontraron instituciones
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
