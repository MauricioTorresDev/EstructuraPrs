package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions;

public class DuplicateModularCodeException extends ConflictException {

    public DuplicateModularCodeException(String modularCode){
        super("Ya existe una Institución con el codigo modular: "+ modularCode);
    }
}
