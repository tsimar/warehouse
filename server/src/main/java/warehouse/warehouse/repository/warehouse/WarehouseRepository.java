package warehouse.warehouse.repository.warehouse;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.warehouse.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
}
