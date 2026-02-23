package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.repositories;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities.InstitutionEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface InstitutionR2dbcRepository extends ReactiveCrudRepository<InstitutionEntity, UUID> {
    Flux<InstitutionEntity> findByStatus(String status);
    Mono<InstitutionEntity> findByModularCode(String modularCode);
}
