package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.domain.models.vo;

import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private String shift;
    private LocalTime startTime;
    private LocalTime endTime;
}
