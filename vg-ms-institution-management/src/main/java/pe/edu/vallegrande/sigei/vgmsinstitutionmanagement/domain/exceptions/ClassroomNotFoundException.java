package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions;

public class ClassroomNotFoundException  extends NotFoundException{
    public ClassroomNotFoundException(String id){
        super("Aula no encontrada con id: "+ id);
    }
}
