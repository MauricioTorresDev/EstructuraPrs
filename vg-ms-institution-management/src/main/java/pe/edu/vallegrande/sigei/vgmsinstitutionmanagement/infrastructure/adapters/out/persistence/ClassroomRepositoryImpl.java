package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.adapters.out.persistence;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IClassroomRepository;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.mappers.ClassroomPersistenceMapper;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence.repositories.ClassroomR2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ClassroomRepositoryImpl implements IClassroomRepository {

    private final ClassroomR2dbcRepository r2dbcRepository;
    private final ClassroomPersistenceMapper mapper;

    @Override
    public Mono<Classroom> save(Classroom classroom) {
        return r2dbcRepository.save(mapper.toEntity(classroom))
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Classroom> findById(String id) {
        return r2dbcRepository.findById(UUID.fromString(id))
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Classroom> findAll() {
        return r2dbcRepository.findAll()
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Classroom> findByStatus(ClassroomStatus status) {
        return r2dbcRepository.findByStatus(status.name())
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Classroom> findByInstitutionId(String institutionId) {
        return r2dbcRepository.findByInstitutionId(UUID.fromString(institutionId))
                .map(mapper::toDomain);
    }
}
