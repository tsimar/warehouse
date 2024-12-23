package warehouse.warehouse.service.add;


import jakarta.transaction.Transactional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import warehouse.warehouse.entity.add.ElementName;
import warehouse.warehouse.repository.add.ElementRepository;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
public class ElementService {
    private final ElementRepository elementRepository;

    private static final String path = "./PDF";
    File newDir=new File(path);
    private Path foundFile;

    public ElementService(ElementRepository elementRepository) {
        this.elementRepository = elementRepository;


    }

    public void uploadFile(MultipartFile file) throws Exception {


        if(!newDir.exists()){
            System.out.println(newDir.mkdir()+" -----"+ newDir.getAbsolutePath());
        }

        // Save file on system
        if (!file.getOriginalFilename().isEmpty()) {

            BufferedOutputStream outputStream =
                    new BufferedOutputStream(
                            new FileOutputStream(new File(newDir,
                                    file.getOriginalFilename())));

            outputStream.write(file.getBytes());
            outputStream.flush();
            outputStream.close();

        } else {
            throw new Exception();

        }


    }

    public Resource getFileAsResource(String fileCode) throws IOException {

        if (newDir.exists()) {

            Path dirPath = Paths.get(newDir.getAbsolutePath());

            try {
                Files.list(dirPath).forEach(file -> {
                    if (file.getFileName().toString().startsWith(fileCode)) {
                        foundFile = file;
                        return;
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (foundFile != null) {
                try {
                    return new UrlResource(foundFile.toUri());
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }


//    public File getListOfFiles(String nameFile) throws Exception {
//
//        File resourceFile = new File(path + "/TapScanner 20-12-2022-20꞉55.pdf");
//        return resourceFile;
//    }


    public List<ElementName> getAll() {
        return elementRepository.findAll();
    }

    public ElementName save(ElementName element) {
        return elementRepository.save(element);
    }


    //    @Autowired
    @Transactional
    public void editElement(ElementName element) {
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
