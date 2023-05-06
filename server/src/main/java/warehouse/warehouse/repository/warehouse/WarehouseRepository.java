package warehouse.warehouse.repository.warehouse;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.warehouse.Warehouse;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    @Query(value = "SELECT w FROM Warehouse w WHERE w.warehouseName=?1 ")
    List<Warehouse> getWarehouse(String warehouseName);

    @Query(value = "SELECT w FROM Warehouse w WHERE w.warehouseName=?1")
    List<Warehouse> getIn(String in);

    @Query(value = "SELECT w FROM Warehouse w WHERE w.warehouseName=?1 ")
    List<Warehouse> getOut(String out);

     @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "UPDATE Warehouse w SET " +
            " w.idProject=?1 WHERE w.idProject=?2"
    )
    Integer updateProject(
            long setProject,
            long selectProject
       );

    @Transactional
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Query(value = "UPDATE Warehouse w SET " +
            " w.idModule=?2 WHERE w.idProject=?1 AND w.idModule=?3"
    )
    Integer updateModule(
            long idProject,
            long idModule, long oldIdModule
    );
    @Query(value = "SELECT w.idProject FROM Warehouse w WHERE w.id=?1 ")
    long getIdProject(long id);
}
