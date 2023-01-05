package warehouse.warehouse.repository.warehouse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;

import java.util.List;

public interface WarehouseWorkRepository extends JpaRepository <WarehouseWork,Long>{
    @Query(value = "SELECT w FROM WarehouseWork w WHERE w.warehouseOpen=?1 ")
    List<WarehouseWork> findAllOpen(int number);

}
