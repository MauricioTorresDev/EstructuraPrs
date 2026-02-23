package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMethod {
    private String type;
    private String value;
}
