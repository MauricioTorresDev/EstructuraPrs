package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.ClassroomNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.ClassroomStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IDeleteClassroomUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IClassroomRepository;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DeleteClassroomUseCaseImpl implements IDeleteClassroomUseCase {

    private final IClassroomRepository classroomRepository;

    @Override
    public Mono<Classroom> execute(String id) {
        return classroomRepository.findById(id)
                .switchIfEmpty(Mono.error(new ClassroomNotFoundException(id)))
                .flatMap(classroom -> {
                    classroom.setStatus(ClassroomStatus.INACTIVE);
                    classroom.setDeletedAt(LocalDateTime.now());
                    classroom.setUpdatedAt(LocalDateTime.now());
                    return classroomRepository.save(classroom);
                });
    }
}
