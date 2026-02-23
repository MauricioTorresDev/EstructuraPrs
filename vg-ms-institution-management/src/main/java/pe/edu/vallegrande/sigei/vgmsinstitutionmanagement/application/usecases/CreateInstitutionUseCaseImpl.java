package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.DuplicateModularCodeException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.ICreateInstitutionUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CreateInstitutionUseCaseImpl implements ICreateInstitutionUseCase {

    private final IInstitutionRepository institutionRepository;

    @Override
    public Mono<Institution> execute(Institution institution) {
        if (institution.getModularCode() == null || institution.getModularCode().isBlank()) {
            return institutionRepository.save(institution);
        }
        return institutionRepository.findByModularCode(institution.getModularCode())
                .flatMap(existing -> Mono.<Institution>error(
                        new DuplicateModularCodeException(institution.getModularCode())))
                .switchIfEmpty(Mono.defer(() -> institutionRepository.save(institution)));
    }
}
