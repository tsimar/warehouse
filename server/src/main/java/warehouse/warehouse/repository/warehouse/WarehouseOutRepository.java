package warehouse.warehouse.repository.warehouse;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.warehouse.WarehouseOut;

@Repository
public interface WarehouseOutRepository  extends JpaRepository<WarehouseOut,Long> {
}
