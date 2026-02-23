/**
 * Interfaces del módulo Institution
 * Tipos basados en el microservicio vg-ms-institution-management
 */

// ========================
// Enums / Union Types
// ========================

export type InstitutionStatus = "ACTIVE" | "INACTIVE";
export type ClassroomStatus = "ACTIVE" | "INACTIVE";

// ========================
// Value Objects
// ========================

export interface Address {
     department: string;
     province: string;
     district: string;
     urbanization: string;
     reference: string;
}

export interface ContactMethod {
     type: string;
     value: string;
}

export interface Schedule {
     shift: string;
     startTime: string;
     endTime: string;
}

// ========================
// Entidad: Institution
// ========================

export interface Institution {
     id: string;
     codeInstitution: string;
     modularCode: string;
     name: string;
     institutionType: string;
     institutionLevel: string;
     gender: string;
     slogan: string;
     logoUrl: string;
     address: Address;
     contactMethods: ContactMethod[];
     schedules: Schedule[];
     gradingType: string;
     classroomType: string;
     ugel: string;
     dre: string;
     directorId: string;
     status: InstitutionStatus;
     createdAt: string;
     updatedAt: string;
}

// ========================
// Entidad: Classroom
// ========================

export interface Classroom {
     id: string;
     institutionId: string;
     classroomName: string;
     classroomAge: string;
     capacity: number;
     color: string;
     status: ClassroomStatus;
     createdAt: string;
     updatedAt: string;
}

// ========================
// Response DTOs
// ========================

export interface InstitutionCompleteResponse extends Institution {
     classrooms: Classroom[];
}

// Respuesta real del backend /institutions/{id}/detail
export interface InstitutionDetailResponse {
     institution: Institution;
     classrooms: Classroom[];
}

// ========================
// Request DTOs
// ========================

export interface CreateInstitutionRequest {
     codeInstitution: string;
     modularCode: string;
     name: string;
     institutionType: string;
     institutionLevel: string;
     gender: string;
     slogan: string;
     logoUrl: string;
     address: Address;
     contactMethods: ContactMethod[];
     schedules: Schedule[];
     gradingType: string;
     classroomType: string;
     ugel: string;
     dre: string;
     directorId: string;
}

export interface UpdateInstitutionRequest extends Partial<CreateInstitutionRequest> {}

export interface CreateClassroomRequest {
     institutionId: string;
     classroomName: string;
     classroomAge: string;
     capacity: number;
     color: string;
}

export interface UpdateClassroomRequest {
     classroomName?: string;
     classroomAge?: string;
     capacity?: number;
     color?: string;
}

// ========================
// API Response Wrapper
// ========================

export interface ApiResponse<T> {
     success: boolean;
     data: T;
     message: string;
     timestamp: string;
}

// ========================
// Filtros
// ========================

export interface InstitutionFilters {
     search?: string;
     status?: InstitutionStatus;
     institutionType?: string;
     institutionLevel?: string;
}

export interface ClassroomFilters {
     search?: string;
     status?: ClassroomStatus;
     institutionId?: string;
}
