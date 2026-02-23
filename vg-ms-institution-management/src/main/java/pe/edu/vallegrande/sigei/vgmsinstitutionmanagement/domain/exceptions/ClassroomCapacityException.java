package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.exceptions;

public class ClassroomCapacityException extends NotFoundException {
    public ClassroomCapacityException(String capacity){
        super("Se ha excedido la capacidad máxima permitida. (Límite del aula: 25 estudiantes): "+ capacity);
    }
}
