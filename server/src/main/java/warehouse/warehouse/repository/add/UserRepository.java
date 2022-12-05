package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.warehouse.entity.addBD.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    @Query(value = "UPDATE User u SET " +
            "u.nameUser=:nameUser," +
            " u.lastName=:lastName," +
            " u.login=:login, " +
            "u.password=:password," +
            " u.idPosition=:idPosition " +
            "WHERE u.id=:id"
    )
    int update(
            @Param("nameUser") String nameUser,
            @Param("lastName") String lastName,
            @Param("login") String login,
            @Param("password") String password,
            @Param("idPosition") Long idPosition,
            @Param("id") Long id
    );

}


