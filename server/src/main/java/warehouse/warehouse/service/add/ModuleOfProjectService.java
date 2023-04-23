package warehouse.warehouse.service.add;

import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.ModuleOfProject;
import warehouse.warehouse.repository.add.ModuleOfProjectRepository;

import java.util.List;
import java.util.Set;

@Service
public class ModuleOfProjectService<T> {
    private final ModuleOfProjectRepository moduleOfProjectRepository;

    public ModuleOfProjectService(ModuleOfProjectRepository moduleOfProjectRepository) {
        this.moduleOfProjectRepository = moduleOfProjectRepository;
    }

    public List<ModuleOfProject> getAll() {
        return moduleOfProjectRepository.findAll();
    }


    public Set<ModuleOfProject> getModuleOfIdProject(Long idProject) {
        Set<ModuleOfProject> result = moduleOfProjectRepository.getModule(idProject);
        return result;
    }

    public ModuleOfProject save(ModuleOfProject moduleOfProject) {
        return moduleOfProjectRepository.save(moduleOfProject);
    }
    public void deleteModule(Long id) {
        moduleOfProjectRepository.deleteById(id);
    }


    public void editModule(ModuleOfProject moduleOfProject) {
        try {
            moduleOfProjectRepository.update
                    (

                            moduleOfProject.getNameModule(),
                            moduleOfProject.getId(),
                            moduleOfProject.getIdProject()

                                               );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
