package warehouse.warehouse.repository.warehouse;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.warehouse.Warehouse;

import java.util.Collection;
import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    @Query(value = "SELECT w FROM Warehouse w WHERE w.warehouseName=?1 ")
    Collection<Warehouse> getWarehouse(String warehouseName);
}
