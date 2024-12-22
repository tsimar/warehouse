package warehouse.warehouse.service.add;

import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.ModuleName;
import warehouse.warehouse.repository.add.ModuleNameRepository;

import java.util.List;
import java.util.Set;

@Service
public class ModuleNameService<T> {
    private final ModuleNameRepository moduleNameRepository;

    public ModuleNameService(ModuleNameRepository moduleOfProjectRepository) {
        this.moduleNameRepository = moduleOfProjectRepository;
    }

    public List<ModuleName> getAll() {
        return moduleNameRepository.findAll();
    }


//    public Set<ModuleName> getModuleOfIdProject(Long idProject) {
//        Set<ModuleName> result = moduleNameRepository.getModule(idProject);
//        return result;
//    }

    public ModuleName save(ModuleName moduleOfProject) {
        return moduleNameRepository.save(moduleOfProject);
    }

    public void deleteModule(Long id) {
        moduleNameRepository.deleteById(id);
    }


    public void editModule(ModuleName moduleName) {
        try {
            moduleNameRepository.update
                    (
                            moduleName.getNameModule(),
                           moduleName.getId()
                    );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
