package warehouse.warehouse.DTO;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ChangeWorkMachine {
    long id;
    private String bacaFanuc;
    private String lathe;
    private String heidenhain;
    private String millingMachineSmall;
    private Long idElement;
    private Long idProject;
    private int latheTime;
    private int heidenhainTime;
    private int smallTime;
    private int fanucTime;

}
