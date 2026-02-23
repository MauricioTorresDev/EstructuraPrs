package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.InstitutionNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo.InstitutionStatus;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IGetInstitutionUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GetInstitutionUseCaseImpl implements IGetInstitutionUseCase {

    private final IInstitutionRepository institutionRepository;

    @Override
    public Flux<Institution> findAll() {
        return institutionRepository.findAll();
    }

    @Override
    public Mono<Institution> findById(String id) {
        return institutionRepository.findById(id)
                .switchIfEmpty(Mono.error(new InstitutionNotFoundException(id)));
    }

    @Override
    public Flux<Institution> findByStatus(InstitutionStatus status) {
        return institutionRepository.findByStatus(status);
    }
}
