package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.Project;


@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Transactional
//    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Project n SET n.nameProject=:nameProject, n.code112=:code112 WHERE n.id=:id")
    int update(@Param("nameProject") String nameProject, @Param("code112") String code112, @Param("id") Long id);


}
