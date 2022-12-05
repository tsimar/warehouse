package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.addBD.NameProject;


@Repository
public interface NameProjectRepository extends JpaRepository<NameProject,Long> {
    @Transactional
//    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE NameProject n SET n.nameProject=:nameProject, n.code112=:code112 WHERE n.id=:id")
    int update(@Param("nameProject") String nameProject, @Param("code112") String code112, @Param("id") Long id);


}
