package com.pagen.service.dto;

public class ExportQuestionsDTO {

    private int mcq;
    private int twoMarks;
    private int threeMarks;
    private int fourMarks;
    private int fiveMarks;

    public ExportQuestionsDTO(int mcq, int twoMarks, int threeMarks, int fourMarks, int fiveMarks) {
        this.mcq = mcq;
        this.twoMarks = twoMarks;
        this.threeMarks = threeMarks;
        this.fourMarks = fourMarks;
        this.fiveMarks = fiveMarks;
    }

    public ExportQuestionsDTO() {
    }

    public int getMcq() {
        return mcq;
    }

    public void setMcq(int mcq) {
        this.mcq = mcq;
    }

    public int getTwoMarks() {
        return twoMarks;
    }

    public void setTwoMarks(int twoMarks) {
        this.twoMarks = twoMarks;
    }

    public int getThreeMarks() {
        return threeMarks;
    }

    public void setThreeMarks(int threeMarks) {
        this.threeMarks = threeMarks;
    }

    public int getFourMarks() {
        return fourMarks;
    }

    public void setFourMarks(int fourMarks) {
        this.fourMarks = fourMarks;
    }

    public int getFiveMarks() {
        return fiveMarks;
    }

    public void setFiveMarks(int fiveMarks) {
        this.fiveMarks = fiveMarks;
    }

    @Override
    public String toString() {
        return "ExportQuestionsDTO{" +
            "mcq=" + mcq +
            ", twoMarks=" + twoMarks +
            ", threeMarks=" + threeMarks +
            ", fourMarks=" + fourMarks +
            ", fiveMarks=" + fiveMarks +
            '}';
    }
}
