package warehouse.warehouse.repository.add;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import warehouse.warehouse.entity.addBD.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}


