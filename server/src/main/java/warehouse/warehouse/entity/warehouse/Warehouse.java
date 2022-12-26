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


    private int number;
    private Date dataStart;
    private Long idProject;
    private Long idElement;
    private Long idUser;
    private String warehouseName;

}
