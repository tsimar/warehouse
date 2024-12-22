package warehouse.warehouse.entity.warehouse;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;


@Data
@Entity

public class Warehouse {

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private Date dataStart;
    private Long idProject;
    private Long idModuleOfProject;
    private Long idElementOfModule;
    private Long idUser;
    private String warehouseName;

}
