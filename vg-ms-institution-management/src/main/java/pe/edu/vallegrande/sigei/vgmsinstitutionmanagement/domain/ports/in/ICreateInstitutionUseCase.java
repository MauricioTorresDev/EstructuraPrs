package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in;

import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import reactor.core.publisher.Mono;

public interface ICreateInstitutionUseCase {
    Mono<Institution> execute(Institution institution);
}