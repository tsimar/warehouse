package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.addBD.Position;

@Repository
public interface PositionRepository  extends JpaRepository<Position, Long> {
}
