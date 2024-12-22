package warehouse.warehouse.service.add;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import warehouse.warehouse.repository.add.ElementRepository;


@ExtendWith({MockitoExtension.class})
class ElementServiceTest {



    ElementServiceTest(ElementService elementService, ElementRepository elementRepository) {
        this.elementService = elementService;
        this.elementRepository = elementRepository;
    }

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @InjectMocks
    private ElementService elementService;

    @Mock //@Spy
    private ElementRepository elementRepository;

//    @Test
//    void getAll (){
//        Mockito.when(elementService.getAll()).thenReturn(List<ElementService>);
//        elementService.getAll();
//        Mockito.verify();

//    }

}