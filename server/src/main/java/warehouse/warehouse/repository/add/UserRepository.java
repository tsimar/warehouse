package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.add.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE User u SET " +
            "u.nameUser=?1," +
            " u.lastName=?2," +
            " u.login=?3, " +
            "u.password=?4," +
            " u.idPosition=?5 " +
            "WHERE u.id=?6"
    )
    int update(
           String nameUser,
            String lastName,
            String login,
           String password,
            Long idPosition,
            Long id
    );

}


