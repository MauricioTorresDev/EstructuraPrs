package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String department;
    private String province;
    private String district;
    private String urbanization;
    private String reference;
}
