package warehouse.warehouse.repository.warehouse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.warehouse.WarehouseWork;

import java.util.List;

@Repository
public interface WarehouseWorkRepository extends JpaRepository<WarehouseWork, Long> {
    @Query(value = "SELECT w FROM WarehouseWork w WHERE w.warehouseOpen=?1 ")
    List<WarehouseWork> findAllOpen(int number);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE WarehouseWork w SET  w.bacaFanuc=?1, w.heidenhain=?2, w.lathe=?3, w.millingMachineSmall=?4, w.warehouseOpen=?5 WHERE w.id=?6"
    )
int update(
            String bacaFanuc,
            String heidenhain,
            String lathe,
            String millingMachineSmall,
            int status,
            long id

    );



}
