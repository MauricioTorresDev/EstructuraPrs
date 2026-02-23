package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.InstitutionNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IRestoreInstitutionUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RestoreInstitutionUseCaseImpl implements IRestoreInstitutionUseCase {

    private final IInstitutionRepository institutionRepository;

    @Override
    public Mono<Institution> execute(String id) {
        return institutionRepository.findById(id)
                .switchIfEmpty(Mono.error(new InstitutionNotFoundException(id)))
                .flatMap(institution -> {
                    institution.setStatus(InstitutionStatus.ACTIVE);
                    institution.setDeletedAt(null);
                    institution.setUpdatedAt(LocalDateTime.now());
                    return institutionRepository.save(institution);
                });
    }
}
