package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import reactor.core.publisher.Mono;
public interface IDeleteClassroomUseCase {
    Mono<Classroom> execute(String id);
}
