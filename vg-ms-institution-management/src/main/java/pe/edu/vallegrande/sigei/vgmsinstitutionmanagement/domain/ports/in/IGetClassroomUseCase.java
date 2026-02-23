package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IGetClassroomUseCase {
    Flux<Classroom> findAll();
    Mono<Classroom> findById(String id);
    Flux<Classroom> findByStatus(ClassroomStatus status);
    Flux<Classroom> findByInstitutionId(String institutionId);
}
