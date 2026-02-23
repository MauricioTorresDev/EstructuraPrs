/**
 * Servicio: Institution
 * Comunicación con el microservicio vg-ms-institution-management (puerto 9080)
 */

import type {
     Institution,
     Classroom,
     InstitutionCompleteResponse,
     InstitutionDetailResponse,
     CreateInstitutionRequest,
     UpdateInstitutionRequest,
     CreateClassroomRequest,
     UpdateClassroomRequest,
     ApiResponse,
     InstitutionFilters,
     ClassroomFilters,
} from "../models/Institution.interface";

const API_URL =
     import.meta.env.VITE_INSTITUTION_API_URL ||
     "http://localhost:9080/api/v1";

// ============================================================
// INSTITUTION ENDPOINTS
// ============================================================

export const institutionService = {
     // ---- Lectura ----

     async getAll(): Promise<Institution[]> {
          const response = await fetch(`${API_URL}/institutions`);
          if (!response.ok) throw new Error("Error al obtener instituciones");
          const apiResponse: ApiResponse<Institution[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getActiveInstitutions(): Promise<Institution[]> {
          const response = await fetch(`${API_URL}/institutions/active`);
          if (!response.ok)
               throw new Error("Error al obtener instituciones activas");
          const apiResponse: ApiResponse<Institution[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getInactiveInstitutions(): Promise<Institution[]> {
          const response = await fetch(`${API_URL}/institutions/inactive`);
          if (!response.ok)
               throw new Error("Error al obtener instituciones inactivas");
          const apiResponse: ApiResponse<Institution[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getById(id: string): Promise<Institution> {
          const response = await fetch(`${API_URL}/institutions/${id}`);
          if (!response.ok) throw new Error("Institución no encontrada");
          const apiResponse: ApiResponse<Institution> =
               await response.json();
          return apiResponse.data;
     },

     async getInstitutionById(
          id: string
     ): Promise<InstitutionCompleteResponse> {
          const response = await fetch(
               `${API_URL}/institutions/${id}/detail`
          );
          if (!response.ok)
               throw new Error("Institución no encontrada");
          const apiResponse: ApiResponse<InstitutionDetailResponse> =
               await response.json();
          // El backend devuelve { institution: {...}, classrooms: [...] }
          // Aplanar a InstitutionCompleteResponse
          const { institution, classrooms } = apiResponse.data;
          return { ...institution, classrooms: classrooms || [] };
     },

     // ---- Escritura ----

     async create(data: CreateInstitutionRequest): Promise<Institution> {
          const response = await fetch(`${API_URL}/institutions`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               const errorData = await response.json().catch(() => null);
               throw new Error(
                    errorData?.message || "Error al crear la institución"
               );
          }
          const apiResponse: ApiResponse<Institution> =
               await response.json();
          return apiResponse.data;
     },

     async update(
          id: string,
          data: UpdateInstitutionRequest
     ): Promise<Institution> {
          const response = await fetch(`${API_URL}/institutions/${id}`, {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               const errorData = await response.json().catch(() => null);
               throw new Error(
                    errorData?.message ||
                         "Error al actualizar la institución"
               );
          }
          const apiResponse: ApiResponse<Institution> =
               await response.json();
          return apiResponse.data;
     },

     async delete(id: string): Promise<string> {
          const response = await fetch(`${API_URL}/institutions/${id}`, {
               method: "DELETE",
          });
          if (!response.ok) throw new Error("Error al eliminar la institución");
          const apiResponse: ApiResponse<Institution> =
               await response.json();
          return apiResponse.message;
     },

     async restore(id: string): Promise<string> {
          const response = await fetch(
               `${API_URL}/institutions/${id}/restore`,
               { method: "PATCH" }
          );
          if (!response.ok)
               throw new Error("Error al restaurar la institución");
          const apiResponse: ApiResponse<Institution> =
               await response.json();
          return apiResponse.message;
     },

     // ---- Filtrado (client-side) ----

     filterInstitutions(
          institutions: Institution[],
          filters: InstitutionFilters
     ): Institution[] {
          return institutions.filter((inst) => {
               if (filters.status && inst.status !== filters.status) {
                    return false;
               }
               if (
                    filters.institutionType &&
                    inst.institutionType !== filters.institutionType
               ) {
                    return false;
               }
               if (
                    filters.institutionLevel &&
                    inst.institutionLevel !== filters.institutionLevel
               ) {
                    return false;
               }
               if (filters.search) {
                    const search = filters.search.toLowerCase();
                    return (
                         inst.name.toLowerCase().includes(search) ||
                         inst.codeInstitution
                              .toLowerCase()
                              .includes(search) ||
                         (inst.modularCode &&
                              inst.modularCode
                                   .toLowerCase()
                                   .includes(search)) ||
                         (inst.ugel &&
                              inst.ugel
                                   .toLowerCase()
                                   .includes(search)) ||
                         (inst.dre &&
                              inst.dre.toLowerCase().includes(search))
                    );
               }
               return true;
          });
     },
};

// ============================================================
// CLASSROOM ENDPOINTS
// ============================================================

export const classroomService = {
     async getAll(): Promise<Classroom[]> {
          const response = await fetch(`${API_URL}/classrooms`);
          if (!response.ok) throw new Error("Error al obtener aulas");
          const apiResponse: ApiResponse<Classroom[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getActive(): Promise<Classroom[]> {
          const response = await fetch(`${API_URL}/classrooms/active`);
          if (!response.ok)
               throw new Error("Error al obtener aulas activas");
          const apiResponse: ApiResponse<Classroom[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getInactive(): Promise<Classroom[]> {
          const response = await fetch(`${API_URL}/classrooms/inactive`);
          if (!response.ok)
               throw new Error("Error al obtener aulas inactivas");
          const apiResponse: ApiResponse<Classroom[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async getById(id: string): Promise<Classroom> {
          const response = await fetch(`${API_URL}/classrooms/${id}`);
          if (!response.ok) throw new Error("Aula no encontrada");
          const apiResponse: ApiResponse<Classroom> =
               await response.json();
          return apiResponse.data;
     },

     async getByInstitution(institutionId: string): Promise<Classroom[]> {
          const response = await fetch(
               `${API_URL}/classrooms/institution/${institutionId}`
          );
          if (!response.ok)
               throw new Error(
                    "Error al obtener aulas de la institución"
               );
          const apiResponse: ApiResponse<Classroom[]> =
               await response.json();
          return apiResponse.data || [];
     },

     async create(data: CreateClassroomRequest): Promise<Classroom> {
          const response = await fetch(`${API_URL}/classrooms`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               const errorData = await response.json().catch(() => null);
               throw new Error(
                    errorData?.message || "Error al crear el aula"
               );
          }
          const apiResponse: ApiResponse<Classroom> =
               await response.json();
          return apiResponse.data;
     },

     async update(
          id: string,
          data: UpdateClassroomRequest
     ): Promise<Classroom> {
          const response = await fetch(`${API_URL}/classrooms/${id}`, {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               const errorData = await response.json().catch(() => null);
               throw new Error(
                    errorData?.message || "Error al actualizar el aula"
               );
          }
          const apiResponse: ApiResponse<Classroom> =
               await response.json();
          return apiResponse.data;
     },

     async delete(id: string): Promise<string> {
          const response = await fetch(`${API_URL}/classrooms/${id}`, {
               method: "DELETE",
          });
          if (!response.ok) throw new Error("Error al eliminar el aula");
          const apiResponse: ApiResponse<Classroom> =
               await response.json();
          return apiResponse.message;
     },

     async restore(id: string): Promise<string> {
          const response = await fetch(
               `${API_URL}/classrooms/${id}/restore`,
               { method: "PATCH" }
          );
          if (!response.ok) throw new Error("Error al restaurar el aula");
          const apiResponse: ApiResponse<Classroom> =
               await response.json();
          return apiResponse.message;
     },

     filterClassrooms(
          classrooms: Classroom[],
          filters: ClassroomFilters
     ): Classroom[] {
          return classrooms.filter((c) => {
               if (filters.status && c.status !== filters.status) {
                    return false;
               }
               if (
                    filters.institutionId &&
                    c.institutionId !== filters.institutionId
               ) {
                    return false;
               }
               if (filters.search) {
                    const search = filters.search.toLowerCase();
                    return (
                         c.classroomName
                              .toLowerCase()
                              .includes(search) ||
                         c.classroomAge
                              .toLowerCase()
                              .includes(search)
                    );
               }
               return true;
          });
     },
};
