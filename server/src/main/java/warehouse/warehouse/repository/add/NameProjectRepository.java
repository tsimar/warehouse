package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.addBD.NameProject;


@Repository
public interface NameProjectRepository extends JpaRepository<NameProject,Long> {
}
