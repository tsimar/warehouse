package warehouse.warehouse.DTO;

import lombok.Data;

@Data
public class ChangeWorkMachine {
    long id;
    private String bacaFanuc;
    private String lathe;
    private String heidenhain;
    private String millingMachineSmall;
    private Long idElement;
    private Long idProject;
}
