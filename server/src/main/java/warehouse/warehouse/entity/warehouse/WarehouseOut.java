package warehouse.warehouse.entity.warehouse;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;


@Data
@Entity

public class WarehouseOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int number;
    private Date dataStart;
    private Long idNameProject;
    private Long idElement;
    private Long idUser;

}
