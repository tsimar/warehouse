package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.addBD.Element;

@Repository
public interface ElementRepository extends JpaRepository<Element,Long> {
    @Transactional
//    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Element u SET u.element=:element, u.urlPicture=:urlPicture WHERE u.id=:id")
    int update(@Param("element") String element, @Param("urlPicture") String urlPicture, @Param("id") Long id);

}
