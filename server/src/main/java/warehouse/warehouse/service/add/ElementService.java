package warehouse.warehouse.service.add;


import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.Element;
import warehouse.warehouse.repository.add.ElementRepository;

import java.util.List;


@Service
public class ElementService {
    private final ElementRepository elementRepository;

    public ElementService(ElementRepository elementRepository) {
        this.elementRepository = elementRepository;
    }

    public List<Element> getAll() {
        return  elementRepository.findAll();
    }

    public Element save(Element element) {
        return elementRepository.save(element);
    }

    //    @Autowired
    @Transactional
    public void editElement(Element element) {
        try {
        elementRepository.update
                (
                       element.getNameElement(),
                        element.getUrlPicture(),
                        element.getId()
                );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    public void deleteElement(Long id) {

        elementRepository.deleteById(id);
    }
}
