import { usersService } from "../../users/service/User.service";
import { institutionService } from "../../institution/service/Institution.service";

export interface TeacherOption {
     id: string;
     name: string;
}

export interface InstitutionOption {
     id: string;
     name: string;
}

export interface ClassroomOption {
     id: string;
     name: string;
     institutionId: string;
}

export interface CourseOption {
     id: string;
     name: string;
     code: string;
}

interface CourseResponse {
     id: string;
     institutionId: string;
     code: string;
     name: string;
     areaCurricular: string;
     ageLevel: string;
     description: string;
     status: "ACTIVE" | "INACTIVE";
     createdAt: string;
     updatedAt: string;
}

const ACADEMIC_API_URL = "http://localhost:9084/api/v1/courses";

export const externalDataService = {
     async getTeachers(): Promise<TeacherOption[]> {
          try {
               const users = await usersService.getAll();
               const teachers = users.filter(
                    (user) =>
                         user.role === "PROFESOR" && user.status === "ACTIVE"
               );

               return teachers.map((teacher) => ({
                    id: teacher.userId,
                    name: `${teacher.firstName} ${teacher.lastName}`,
               }));
          } catch (error) {
               console.error("Error obteniendo profesores:", error);
               return [];
          }
     },

     async getInstitutions(includeId?: string): Promise<InstitutionOption[]> {
          try {
               const institutions =
                    await institutionService.getActiveInstitutions();

               const filteredInstitutions = institutions.filter((institution) => {
                    // Always include the specified institution (e.g. for editing)
                    if (includeId && institution.institutionId === includeId) {
                         return true;
                    }

                    // Filter out inactive institutions (already done by getActiveInstitutions but double check)
                    if (institution.status === "INACTIVE") return false;

                    // Filter out institutions that have inactive classrooms
                    const hasInactiveClassrooms = institution.classrooms?.some(
                         (classroom) => classroom.status === "INACTIVE"
                    );
                    if (hasInactiveClassrooms) return false;

                    return true;
               });

               return filteredInstitutions.map((institution) => ({
                    id: institution.institutionId,
                    name: institution.institutionInformation.institutionName,
               }));
          } catch (error) {
               console.error("Error obteniendo instituciones:", error);
               return [];
          }
     },

     async getClassroomsByInstitution(
          institutionId: string
     ): Promise<ClassroomOption[]> {
          try {
               if (!institutionId) return [];

               const institution = await institutionService.getInstitutionById(
                    institutionId
               );

               if (!institution.classrooms) return [];

               return institution.classrooms
                    .filter(
                         (classroom) =>
                              !classroom.deletedAt &&
                              classroom.status === "ACTIVE"
                    )
                    .map((classroom) => ({
                         id: classroom.classroomId,
                         name: classroom.classroomName,
                         institutionId: institution.institutionId,
                    }));
          } catch (error) {
               console.error("Error obteniendo aulas:", error);
               return [];
          }
     },

     async getCourses(): Promise<CourseOption[]> {
          try {
               const response = await fetch(ACADEMIC_API_URL);
               if (!response.ok) {
                    console.error("Error al obtener cursos:", response.status);
                    return [];
               }

               const courses: CourseResponse[] = await response.json();

               return courses
                    .filter((course) => course.status === "ACTIVE")
                    .map((course) => ({
                         id: course.id,
                         name: course.name,
                         code: course.code,
                    }));
          } catch (error) {
               console.error("Error obteniendo cursos:", error);
               return [];
          }
     },
};
