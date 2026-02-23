package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.application.usecases;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions.InstitutionNotFoundException;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.Institution;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.in.IUpdateInstitutionUseCase;
import pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.ports.out.IInstitutionRepository;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UpdateInstitutionUseCaseImpl implements IUpdateInstitutionUseCase {

    private final IInstitutionRepository institutionRepository;

    @Override
    public Mono<Institution> execute(String id, Institution updatedData) {
        return institutionRepository.findById(id)
                .switchIfEmpty(Mono.error(new InstitutionNotFoundException(id)))
                .flatMap(existing -> {
                    mergeFields(existing, updatedData);
                    existing.setUpdatedAt(LocalDateTime.now());
                    return institutionRepository.save(existing);
                });
    }

    private void mergeFields(Institution existing, Institution updated) {
        if (updated.getCodeInstitution() != null) existing.setCodeInstitution(updated.getCodeInstitution());
        if (updated.getModularCode() != null) existing.setModularCode(updated.getModularCode());
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getInstitutionType() != null) existing.setInstitutionType(updated.getInstitutionType());
        if (updated.getInstitutionLevel() != null) existing.setInstitutionLevel(updated.getInstitutionLevel());
        if (updated.getGender() != null) existing.setGender(updated.getGender());
        if (updated.getSlogan() != null) existing.setSlogan(updated.getSlogan());
        if (updated.getLogoUrl() != null) existing.setLogoUrl(updated.getLogoUrl());
        if (updated.getAddress() != null) existing.setAddress(updated.getAddress());
        if (updated.getContactMethods() != null) existing.setContactMethods(updated.getContactMethods());
        if (updated.getSchedules() != null) existing.setSchedules(updated.getSchedules());
        if (updated.getGradingType() != null) existing.setGradingType(updated.getGradingType());
        if (updated.getClassroomType() != null) existing.setClassroomType(updated.getClassroomType());
        if (updated.getUgel() != null) existing.setUgel(updated.getUgel());
        if (updated.getDre() != null) existing.setDre(updated.getDre());
        if (updated.getDirectorId() != null) existing.setDirectorId(updated.getDirectorId());
    }
}
