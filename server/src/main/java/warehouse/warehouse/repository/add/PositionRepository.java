package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.addBD.Position;

@Repository
public interface PositionRepository  extends JpaRepository<Position, Long> {
    @Transactional
//    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Position p SET p.position=:position, p.permission=:permission WHERE p.id=:id")
    int update(@Param("position") String element, @Param("permission") String permission, @Param("id") Long id);

}
