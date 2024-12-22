package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.ElementName;

@Repository
public interface ElementRepository extends JpaRepository<ElementName,Long> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE ElementName u SET u.nameElement=?1, u.urlPicture=?2 WHERE u.id=?3")
    void update( String nameElement,  String urlPicture,  Long id);

}
