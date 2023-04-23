package warehouse.warehouse.service.add;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.Project;
import warehouse.warehouse.repository.add.ProjectRepository;

import java.time.LocalDate;
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
        Project project = new Project();
        LocalDate today = LocalDate.now();
        int min = today.getDayOfMonth();
        int max = min * 13;
        int range = (max - min) + 1;

        int code = (int) (Math.random() * range) + min;
        String code128 = code + "" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + today.getYear();
        project.setNameProject(nameProject.getNameProject());
        project.setCode112(code128);
        return projectRepository.save(project);
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

    final void metod() {
//        return;
    }
}
