package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.adapters.in.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.common.ApiResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.CreateClassroomRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.UpdateClassroomRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.ClassroomResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.mappers.ClassroomMapper;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/classrooms")
@RequiredArgsConstructor
public class ClassroomRest {

    private final ICreateClassroomUseCase createClassroomUseCase;
    private final IGetClassroomUseCase getClassroomUseCase;
    private final IUpdateClassroomUseCase updateClassroomUseCase;
    private final IDeleteClassroomUseCase deleteClassroomUseCase;
    private final IRestoreClassroomUseCase restoreClassroomUseCase;
    private final ClassroomMapper classroomMapper;

    @GetMapping
    public Mono<ApiResponse<List<ClassroomResponse>>> getAll() {
        return getClassroomUseCase.findAll()
                .map(classroomMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Aulas obtenidas"));
    }

    @GetMapping("/active")
    public Mono<ApiResponse<List<ClassroomResponse>>> getActive() {
        return getClassroomUseCase.findByStatus(ClassroomStatus.ACTIVE)
                .map(classroomMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Aulas activas obtenidas"));
    }

    @GetMapping("/inactive")
    public Mono<ApiResponse<List<ClassroomResponse>>> getInactive() {
        return getClassroomUseCase.findByStatus(ClassroomStatus.INACTIVE)
                .map(classroomMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Aulas inactivas obtenidas"));
    }

    @GetMapping("/{id}")
    public Mono<ApiResponse<ClassroomResponse>> getById(@PathVariable String id) {
        return getClassroomUseCase.findById(id)
                .map(classroomMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Aula encontrada"));
    }

    @GetMapping("/institution/{institutionId}")
    public Mono<ApiResponse<List<ClassroomResponse>>> getByInstitution(@PathVariable String institutionId) {
        return getClassroomUseCase.findByInstitutionId(institutionId)
                .map(classroomMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Aulas de institución obtenidas"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ApiResponse<ClassroomResponse>> create(@RequestBody CreateClassroomRequest request) {
        Classroom classroom = classroomMapper.toDomain(request);
        return createClassroomUseCase.execute(classroom)
                .map(classroomMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Aula creada exitosamente"));
    }

    @PutMapping("/{id}")
    public Mono<ApiResponse<ClassroomResponse>> update(@PathVariable String id,
                                                       @RequestBody UpdateClassroomRequest request) {
        Classroom updatedData = classroomMapper.toDomain(request);
        return updateClassroomUseCase.execute(id, updatedData)
                .map(classroomMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Aula actualizada exitosamente"));
    }

    @DeleteMapping("/{id}")
    public Mono<ApiResponse<ClassroomResponse>> delete(@PathVariable String id) {
        return deleteClassroomUseCase.execute(id)
                .map(classroomMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Aula eliminada exitosamente"));
    }

    @PatchMapping("/{id}/restore")
    public Mono<ApiResponse<ClassroomResponse>> restore(@PathVariable String id) {
        return restoreClassroomUseCase.execute(id)
                .map(classroomMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Aula restaurada exitosamente"));
    }
}
