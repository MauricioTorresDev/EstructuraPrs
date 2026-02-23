package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions;

public class InstitutionNotFoundException extends NotFoundException{

    public InstitutionNotFoundException(String id){
        super("Insitución no encontrado con id: " + id);
    }
}
