package warehouse.warehouse.entity.addBD;




import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class NameProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 45,unique = true)
    private String nameProject;

    @Column(nullable = false,length = 64)
    private String code112;

}
