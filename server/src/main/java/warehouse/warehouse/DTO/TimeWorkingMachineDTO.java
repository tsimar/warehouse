package warehouse.warehouse.DTO;

import java.sql.Date;

public class TimeWorkingMachineDTO {

    private int number;
    private Date dataStart;
    private Date dataFinish;
    private Long idProject;
    private Long idModule;
    private Long idElement;


    private int latheTime;

    private int heidenhainTime;

    private int smallTime;

    private int fanucTime;


    private int sumTimeFanuc;
    private int sumTimeSmall;
    private int sumTimeHeidenhain;
    private int sumTimeLathe;

    public int getNumber() {
        return number;
    }

    public Date getDataStart() {
        return dataStart;
    }

    public Date getDataFinish() {
        return dataFinish;
    }

    public Long getIdProject() {
        return idProject;
    }

    public Long getIdModule() {
        return idModule;
    }

    public Long getIdElement() {
        return idElement;
    }

    public int getLatheTime() {
        return latheTime;
    }

    public int getHeidenhainTime() {
        return heidenhainTime;
    }

    public int getSmallTime() {
        return smallTime;
    }

    public int getFanucTime() {
        return fanucTime;
    }



    public int getSumTimeFanuc() {
        return sumTimeFanuc;
    }

    public int getSumTimeSmall() {
        return sumTimeSmall;
    }

    public int getSumTimeHeidenhain() {
        return sumTimeHeidenhain;
    }

    public int getSumTimeLathe() {
        return sumTimeLathe;
    }
}
