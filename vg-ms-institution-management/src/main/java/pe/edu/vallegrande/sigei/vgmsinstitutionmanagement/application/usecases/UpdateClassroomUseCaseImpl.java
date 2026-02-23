package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.ClassroomNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Classroom;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IUpdateClassroomUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IClassroomRepository;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UpdateClassroomUseCaseImpl implements IUpdateClassroomUseCase {

    private final IClassroomRepository classroomRepository;

    @Override
    public Mono<Classroom> execute(String id, Classroom updatedData) {
        return classroomRepository.findById(id)
                .switchIfEmpty(Mono.error(new ClassroomNotFoundException(id)))
                .flatMap(existing -> {
                    if (updatedData.getClassroomName() != null) existing.setClassroomName(updatedData.getClassroomName());
                    if (updatedData.getClassroomAge() != null) existing.setClassroomAge(updatedData.getClassroomAge());
                    if (updatedData.getCapacity() != null) existing.setCapacity(updatedData.getCapacity());
                    if (updatedData.getColor() != null) existing.setColor(updatedData.getColor());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return classroomRepository.save(existing);
                });
    }
}
