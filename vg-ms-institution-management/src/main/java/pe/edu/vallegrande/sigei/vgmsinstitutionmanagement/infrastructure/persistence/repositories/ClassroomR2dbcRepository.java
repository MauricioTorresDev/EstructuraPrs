package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.repositories;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.entities.ClassroomEntity;
import reactor.core.publisher.Flux;

import java.util.UUID;

@Repository
public interface ClassroomR2dbcRepository extends ReactiveCrudRepository<ClassroomEntity, UUID> {
    Flux<ClassroomEntity> findByStatus(String status);
    Flux<ClassroomEntity> findByInstitutionId(UUID institutionId);
}