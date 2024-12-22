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
    private Long idModuleOfProject;
    private Long idElementOfModule;
    private String bacaFanuc;
    private String lathe;
    private String heidenhain;
    private String millingMachineSmall;

    private int latheTime;

    private int heidenhainTime;

    private int smallTime;

    private int fanucTime;

    private int warehouseOpen;

}
