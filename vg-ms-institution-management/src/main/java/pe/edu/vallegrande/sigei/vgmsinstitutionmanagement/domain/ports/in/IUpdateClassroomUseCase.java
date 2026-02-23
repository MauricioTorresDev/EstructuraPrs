package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import reactor.core.publisher.Mono;

public interface IUpdateClassroomUseCase {
    Mono<Classroom> execute(String id, Classroom classroom);
}
