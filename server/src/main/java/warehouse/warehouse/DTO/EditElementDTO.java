package warehouse.warehouse.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Data
@Getter
@Setter
@Component
public class EditElementDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
            long id;
    long idProject;
    long idModule;
    long idOldElement;
    long idElement;
}
