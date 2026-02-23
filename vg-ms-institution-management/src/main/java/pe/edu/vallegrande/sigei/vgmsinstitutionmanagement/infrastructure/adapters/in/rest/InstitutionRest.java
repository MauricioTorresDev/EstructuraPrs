package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.adapters.in.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.common.ApiResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.CreateInstitutionRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.request.UpdateInstitutionRequest;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.ClassroomResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.InstitutionDetailResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.dto.response.InstitutionResponse;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.mappers.ClassroomMapper;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.mappers.InstitutionMapper;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/institutions")
@RequiredArgsConstructor
public class InstitutionRest {

    private final ICreateInstitutionUseCase createInstitutionUseCase;
    private final IGetInstitutionUseCase getInstitutionUseCase;
    private final IUpdateInstitutionUseCase updateInstitutionUseCase;
    private final IDeleteInstitutionUseCase deleteInstitutionUseCase;
    private final IRestoreInstitutionUseCase restoreInstitutionUseCase;
    private final IGetClassroomUseCase getClassroomUseCase;
    private final InstitutionMapper institutionMapper;
    private final ClassroomMapper classroomMapper;

    @GetMapping
    public Mono<ApiResponse<List<InstitutionResponse>>> getAll() {
        return getInstitutionUseCase.findAll()
                .map(institutionMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Instituciones obtenidas"));
    }

    @GetMapping("/active")
    public Mono<ApiResponse<List<InstitutionResponse>>> getActive() {
        return getInstitutionUseCase.findByStatus(InstitutionStatus.ACTIVE)
                .map(institutionMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Instituciones activas obtenidas"));
    }

    @GetMapping("/inactive")
    public Mono<ApiResponse<List<InstitutionResponse>>> getInactive() {
        return getInstitutionUseCase.findByStatus(InstitutionStatus.INACTIVE)
                .map(institutionMapper::toResponse)
                .collectList()
                .map(list -> ApiResponse.success(list, "Instituciones inactivas obtenidas"));
    }

    @GetMapping("/{id}")
    public Mono<ApiResponse<InstitutionResponse>> getById(@PathVariable String id) {
        return getInstitutionUseCase.findById(id)
                .map(institutionMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Institución encontrada"));
    }

    @GetMapping("/{id}/detail")
    public Mono<ApiResponse<InstitutionDetailResponse>> getDetail(@PathVariable String id) {
        return getInstitutionUseCase.findById(id)
                .flatMap(institution ->
                        getClassroomUseCase.findByInstitutionId(id)
                                .map(classroomMapper::toResponse)
                                .collectList()
                                .map(classrooms -> InstitutionDetailResponse.builder()
                                        .institution(institutionMapper.toResponse(institution))
                                        .classrooms(classrooms)
                                        .build())
                )
                .map(detail -> ApiResponse.success(detail, "Detalle de institución obtenido"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ApiResponse<InstitutionResponse>> create(@RequestBody CreateInstitutionRequest request) {
        Institution institution = institutionMapper.toDomain(request);
        return createInstitutionUseCase.execute(institution)
                .map(institutionMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Institución creada exitosamente"));
    }

    @PutMapping("/{id}")
    public Mono<ApiResponse<InstitutionResponse>> update(@PathVariable String id,
                                                         @RequestBody UpdateInstitutionRequest request) {
        Institution updatedData = institutionMapper.toDomain(request);
        return updateInstitutionUseCase.execute(id, updatedData)
                .map(institutionMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Institución actualizada exitosamente"));
    }

    @DeleteMapping("/{id}")
    public Mono<ApiResponse<InstitutionResponse>> delete(@PathVariable String id) {
        return deleteInstitutionUseCase.execute(id)
                .map(institutionMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Institución eliminada exitosamente"));
    }

    @PatchMapping("/{id}/restore")
    public Mono<ApiResponse<InstitutionResponse>> restore(@PathVariable String id) {
        return restoreInstitutionUseCase.execute(id)
                .map(institutionMapper::toResponse)
                .map(response -> ApiResponse.success(response, "Institución restaurada exitosamente"));
    }
}
