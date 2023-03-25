package warehouse.warehouse.entity.warehouse;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
public class WarehouseWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int number;
    private Date dataStart;
    private Date dataFinish;
    private Long idProject;
    private Long idModule;
    private Long idElement;
    private String bacaFanuc;
    private String lathe;
    private String heidenhain;
    private String millingMachineSmall;
    private int timeLathe = 0;
    private int timeHeidenhain = 0;
    private int timeSmall = 0;
    private int timeFanuc = 0;

    private int warehouseOpen;

}
