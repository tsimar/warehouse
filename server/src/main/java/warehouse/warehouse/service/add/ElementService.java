package warehouse.warehouse.service.add;


import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import warehouse.warehouse.entity.add.Element;
import warehouse.warehouse.entity.add.NewElement;
import warehouse.warehouse.repository.add.ElementRepository;
import warehouse.warehouse.repository.add.NewElementRepo;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectInputFilter;
import java.util.ArrayList;
import java.util.List;


@Service
public class ElementService {
    private final ElementRepository elementRepository;
    private final NewElementRepo newElementRepository;

    private static final String path = "C:\\English";

    public void uploadFile(MultipartFile file)
            throws Exception {

        // Save file on system
        if (!file.getOriginalFilename().isEmpty()) {

            BufferedOutputStream outputStream =
                    new BufferedOutputStream(
                            new FileOutputStream(new File(path,
                                    file.getOriginalFilename())));

            outputStream.write(file.getBytes());
            outputStream.flush();
            outputStream.close();

        } else {
            throw new Exception();

        }

//        List<String> list = new ArrayList<String>();
//        File files = new File(path);
//        String[] fileList = files.list();
//        for (String name : fileList) {
//            list.add(name);
//        }
//
//        return list;
    }
    public File  getListOfFiles(String nameFile) throws Exception {

//        List<String> list = new ArrayList<>();
//        File files = new File(path);
//        String[] fileList = ((File) files).list();
//        for (String name : fileList) {
//            if (nameFile!="" || nameFile==name)
//            list.add(name);
//        }
//
//        return list;
        File resourceFile = new File(path+"/TapScanner 20-12-2022-20꞉55.pdf");
    return resourceFile;
    }


    public ElementService(ElementRepository elementRepository, NewElementRepo newElementRepository) {
        this.elementRepository = elementRepository;
        this.newElementRepository = newElementRepository;
    }

    public List<Element> getAll() {
        return  elementRepository.findAll();
    }

    public Element save(Element element) {
        return elementRepository.save(element);
    }

    public NewElement newSave(NewElement newElement) {
        return newElementRepository.save(newElement);
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
