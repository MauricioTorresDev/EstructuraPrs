package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.InstitutionNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.ICreateClassroomUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IClassroomRepository;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CreateClassroomUseCaseImpl implements ICreateClassroomUseCase {

    private final IClassroomRepository classroomRepository;
    private final IInstitutionRepository institutionRepository;

    @Override
    public Mono<Classroom> execute(Classroom classroom) {
        return institutionRepository.findById(classroom.getInstitutionId())
                .switchIfEmpty(Mono.error(new InstitutionNotFoundException(classroom.getInstitutionId())))
                .flatMap(institution -> classroomRepository.save(classroom));
    }
}
