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
    @Query(value = "UPDATE WarehouseWork w SET " +
            " w.latheTime=?1, " +
            "w.fanucTime=?2, " +
            "w.heidenhainTime=?3, " +
            "w.smallTime=?4, " +
            " w.bacaFanuc=?5, " +
            "w.heidenhain=?6, " +
            "w.lathe=?7, " +
            "w.millingMachineSmall=?8, " +
            "w.warehouseOpen=?9 " +
            "WHERE w.id=?10"
    )
    int update(
            int latheTime,
            int fanucTime,
            int heidenhainTime,
            int smallTime,
            String bacaFanuc,
            String heidenhain,
            String lathe,
            String millingMachineSmall,
            int status,
            long id

    );


}
