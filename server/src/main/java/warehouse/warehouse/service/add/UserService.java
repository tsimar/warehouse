package warehouse.warehouse.service.add;

import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.addBD.User;
import warehouse.warehouse.repository.add.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User save(User user){
        return userRepository.save(user);
    }
}
