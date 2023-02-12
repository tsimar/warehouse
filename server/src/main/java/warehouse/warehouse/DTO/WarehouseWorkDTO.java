package warehouse.warehouse.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class WarehouseWorkDTO {
    private int number;
    private Date dataStart;
    private Date dataFinish;
    private Long idProject;
    private Long idElement;
    private String bacaFanuc;
    private String lathe;
    private String heidenhain;
    private String millingMachineSmall;

    private int warehouseOpen;
}
