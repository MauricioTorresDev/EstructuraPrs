package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IGetInstitutionUseCase {
    Flux<Institution> findAll();
    Mono<Institution> findById(String id);
    Flux<Institution> findByStatus(InstitutionStatus status);
}
