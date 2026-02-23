package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.ClassroomNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IGetClassroomUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IClassroomRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GetClassroomUseCaseImpl implements IGetClassroomUseCase {

    private final IClassroomRepository classroomRepository;

    @Override
    public Flux<Classroom> findAll() {
        return classroomRepository.findAll();
    }

    @Override
    public Mono<Classroom> findById(String id) {
        return classroomRepository.findById(id)
                .switchIfEmpty(Mono.error(new ClassroomNotFoundException(id)));
    }

    @Override
    public Flux<Classroom> findByStatus(ClassroomStatus status) {
        return classroomRepository.findByStatus(status);
    }

    @Override
    public Flux<Classroom> findByInstitutionId(String institutionId) {
        return classroomRepository.findByInstitutionId(institutionId);
    }
}
