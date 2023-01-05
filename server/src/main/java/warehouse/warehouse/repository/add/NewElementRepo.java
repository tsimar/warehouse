package warehouse.warehouse.repository.add;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.warehouse.entity.add.NewElement;

public interface NewElementRepo extends JpaRepository<NewElement,Long> {
}
