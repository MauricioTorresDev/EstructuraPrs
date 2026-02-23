package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.adapters.out.persistence;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.mappers.InstitutionPersistenceMapper;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.repositories.InstitutionR2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class InstitutionRepositoryImpl implements IInstitutionRepository {

    private final InstitutionR2dbcRepository r2dbcRepository;
    private final InstitutionPersistenceMapper mapper;

    @Override
    public Mono<Institution> save(Institution institution) {
        return r2dbcRepository.save(mapper.toEntity(institution))
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Institution> findById(String id) {
        return r2dbcRepository.findById(UUID.fromString(id))
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Institution> findAll() {
        return r2dbcRepository.findAll()
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Institution> findByStatus(InstitutionStatus status) {
        return r2dbcRepository.findByStatus(status.name())
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Institution> findByModularCode(String modularCode) {
        return r2dbcRepository.findByModularCode(modularCode)
                .map(mapper::toDomain);
    }
}
