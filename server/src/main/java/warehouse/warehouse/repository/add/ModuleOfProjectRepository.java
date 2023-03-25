package warehouse.warehouse.repository.add;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.ModuleOfProject;

import java.util.Set;

public interface ModuleOfProjectRepository extends JpaRepository<ModuleOfProject, Long> {
    @Transactional
    @Query(value = "Select m FROM ModuleOfProject m WHERE m.idProject=?1")
    Set<ModuleOfProject> getModule(Long idProject);


    @Transactional

    @Query(value = "UPDATE ModuleOfProject m SET m.nameModule=:nameModule, m.idProject=:idProject WHERE m.id=:id")
    int update(@Param("nameModule") String nameModule, @Param("id") Long id, @Param("idProject") Long idProject);

}
