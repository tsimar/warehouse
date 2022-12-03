package warehouse.warehouse.service.add;

import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.addBD.NameProject;
import warehouse.warehouse.repository.add.NameProjectRepository;

import java.util.List;


@Service
public class NameProjectService {
    private final NameProjectRepository nameProjectRepository;

    public NameProjectService(NameProjectRepository nameProjectRepository) {
        this.nameProjectRepository = nameProjectRepository;
    }

    public List<NameProject> getAll() {
        return nameProjectRepository.findAll();
    }

    public NameProject save (NameProject nameProject){
        return nameProjectRepository.save(nameProject);
    }
}
