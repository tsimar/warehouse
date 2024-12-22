package warehouse.warehouse.repository.add;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.ModuleName;

import java.util.Set;

public interface ModuleNameRepository extends JpaRepository<ModuleName, Long> {
//    @Transactional
//    @Query(value = "Select m FROM ModuleName m WHERE m.idProject=?1")
//    Set<ModuleName> getModule(Long idProject);


    @Transactional

    @Query(value = "UPDATE ModuleName m SET m.nameModule=:nameModule  WHERE m.id=:id")
    int update(@Param("nameModule") String nameModule, @Param("id") Long id);

}
