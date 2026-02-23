package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IClassroomRepository {
    Mono<Classroom> save(Classroom classroom);
    Mono<Classroom> findById(String id);
    Flux<Classroom> findAll();
    Flux<Classroom> findByStatus(ClassroomStatus status);
    Flux<Classroom> findByInstitutionId(String institutionId);
}
