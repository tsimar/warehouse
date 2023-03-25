package warehouse.warehouse.entity.add;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ModuleOfProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nameModule;


    private Long idProject;
}
