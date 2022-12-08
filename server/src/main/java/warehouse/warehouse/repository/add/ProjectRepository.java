package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.Project;


@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Project n SET n.nameProject=?1, n.code112=?2 WHERE n.id=?3")
    void update( String nameProject,  String code112,  Long id);


}
