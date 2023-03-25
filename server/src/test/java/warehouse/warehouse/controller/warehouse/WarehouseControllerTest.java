package warehouse.warehouse.controller.warehouse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatcher;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.service.warehouse.WarehouseService;

import java.sql.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@WebMvcTest(controllers = WarehouseWorkController.class)
@AutoConfigureMockMvc(addFilters=false)
@ExtendWith(MockitoExtension.class)
class WarehouseControllerTest<Warrehouse> {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WarehouseService warehouseService;

    @Autowired
    private ObjectMapper objectMapper;

    private Warehouse warehouse1;
    private List<Warehouse> totalElements;

    @BeforeEach
    public void createWarehouse(){

        warehouse1.setId(13L);
        warehouse1.setDataStart(Date.valueOf("2022-12-12"));
        warehouse1.setIdUser(5L);
        warehouse1.setIdProject(7L);
        warehouse1.setIdElement(8L);
        warehouse1.setNumber(5);
        warehouse1.setWarehouseName("in");
        totalElements.add(warehouse1);
    }

//    @Test
//    public void WarehouseController_Save() throws Exception {
//
//        given(warehouseService.save(ArgumentMatchers.any())).willAnswer(invocation -> invocation.getArgument(0));
//        ResultActions response=mockMvc.perform(post("api/warehouse")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(warehouse1)))       ;
//
//        response.andExpect(MockMvcResultMatchers.status().isCreated());
//    }
}