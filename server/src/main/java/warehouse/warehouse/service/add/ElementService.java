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
//        elementRepository
//                .findById(element.getId()) // returns Optional<User>
//                .ifPresent(user1 -> {
//                    user1.setNameElement(element.getNameElement());
//                    user1.setUrlPicture(element.getUrlPicture());;
//
//                    elementRepository.save(user1);
//                });

    }

    public void deleteElement(Long id) {

        elementRepository.deleteById(id);
    }
}
