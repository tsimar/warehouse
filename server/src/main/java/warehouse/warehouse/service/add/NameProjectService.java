package warehouse.warehouse.service.add;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.Project;
import warehouse.warehouse.repository.add.ProjectRepository;

import java.util.List;


@Service
@RequiredArgsConstructor
public class NameProjectService {
    private final ProjectRepository projectRepository;

//    public NameProjectService(NameProjectRepository nameProjectRepository) {
//        this.nameProjectRepository = nameProjectRepository;
//    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    public Project save(Project nameProject) {
        return projectRepository.save(nameProject);
    }

    public void deleteNameProject(Long id) {
        projectRepository.deleteById(id);
    }

    public void editNameProject(Project project) {
        try {
            projectRepository.update
                    (

                            project.getNameProject(),
                            project.getCode112(),
                            project.getId()
                    );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    final void  metod(){
//        return;
    }
}
