package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.Element;

@Repository
public interface ElementRepository extends JpaRepository<Element,Long> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Element u SET u.nameElement=?1, u.urlPicture=?2 WHERE u.id=?3")
    void update( String nameElement,  String urlPicture,  Long id);

}
