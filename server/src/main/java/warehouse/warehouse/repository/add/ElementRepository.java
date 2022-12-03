package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.addBD.Element;

@Repository

public interface ElementRepository extends JpaRepository<Element,Long> {
}
