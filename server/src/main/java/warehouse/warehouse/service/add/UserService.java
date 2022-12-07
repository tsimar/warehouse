package warehouse.warehouse.service.add;

import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.User;
import warehouse.warehouse.repository.add.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void editUser(User user) {
        try {
            userRepository.update
                    (

                            user.getNameUser(),
                            user.getLastName(),
                            user.getLogin(),
                            user.getPassword(),
                            user.getIdPosition(),
                            user.getId()
                    );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
