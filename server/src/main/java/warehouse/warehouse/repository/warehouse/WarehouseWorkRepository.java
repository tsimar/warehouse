package warehouse.warehouse.repository.warehouse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.warehouse.WarehouseWork;

import java.util.List;


@Repository
//@Slf4j
public interface WarehouseWorkRepository extends JpaRepository<WarehouseWork, Long> {
    @Query(value = "SELECT w FROM WarehouseWork w WHERE w.warehouseOpen=?1 ORDER BY idProject")
    List<WarehouseWork> findAllOpen(int number);

    @Query(value = "SELECT w FROM WarehouseWork w WHERE w.warehouseOpen=?1 "+
            " and w.bacaFanuc=\"obróbka\" or w.heidenhain=\"obróbka\" " +
            "or w.lathe=\"obróbka\" or w.millingMachineSmall=\"obróbka\" " +
            "ORDER BY w.dataFinish, w.idProject, w.idModule")
    List sortTimeMachineOfData(int number);

    //            )
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

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "UPDATE WarehouseWork w SET " +
            " w.idProject=?1 WHERE w.idProject=?2"
    )
    Integer updateProject(
            long projectSecond,
            long projectFirst
    );

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "UPDATE WarehouseWork w SET " +
            " w.idModule=?2 WHERE w.idProject=?1 AND w.idModule=?3"
    )
    Integer updateModule(
            long idProject,
            long idModule, long oldIdModule
    );
}
