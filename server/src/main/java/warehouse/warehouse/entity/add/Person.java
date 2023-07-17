package warehouse.warehouse.entity.add;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Integer age;
}
