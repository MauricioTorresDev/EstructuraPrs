package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IInstitutionRepository {
    Mono<Institution> save(Institution institution);
    Mono<Institution> findById(String id);
    Flux<Institution> findAll();
    Flux<Institution> findByStatus(InstitutionStatus status);
    Mono<Institution> findByModularCode(String modularCode);
}
