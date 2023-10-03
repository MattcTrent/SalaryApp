package com.SalaryApplication.Models;

import java.math.BigDecimal;
import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SystemParameter {
    public SystemParameter() {
    }

    public SystemParameter(Integer id, SystemParameterGroupEnum group, String name, BigDecimal rate,
            BigDecimal lowerThreshold,
            BigDecimal upperThreshold) {
        this.id = id;
        this.parameterGroup = group;
        this.name = name;
        this.rate = rate;
        this.lowerThreshold = lowerThreshold;
        this.upperThreshold = upperThreshold;
    }

    public SystemParameter(SystemParameterGroupEnum group, String name, BigDecimal rate, BigDecimal lowerThreshold,
            BigDecimal upperThreshold) {
        this.parameterGroup = group;
        this.name = name;
        this.rate = rate;
        this.lowerThreshold = lowerThreshold;
        this.upperThreshold = upperThreshold;
    }

    public SystemParameter(SystemParameterGroupEnum group, String name, BigDecimal rate) {
        this.parameterGroup = group;
        this.name = name;
        this.rate = rate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Integer id;
    private SystemParameterGroupEnum parameterGroup;
    private String name;
    private BigDecimal rate;
    private BigDecimal lowerThreshold;
    private BigDecimal upperThreshold;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SystemParameterGroupEnum getParameterGroup() {
        return parameterGroup;
    }

    public void setParameterGroup(SystemParameterGroupEnum group) {
        this.parameterGroup = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public BigDecimal getLowerThreshold() {
        return lowerThreshold;
    }

    public void setLowerThreshold(BigDecimal lowerThreshold) {
        this.lowerThreshold = lowerThreshold;
    }

    public BigDecimal getUpperThreshold() {
        return upperThreshold;
    }

    public void setUpperThreshold(BigDecimal upperThreshold) {
        this.upperThreshold = upperThreshold;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        SystemParameter that = (SystemParameter) object;
        return parameterGroup == that.parameterGroup &&
                Objects.equals(name, that.name) &&
                Objects.equals(rate, that.rate) &&
                Objects.equals(lowerThreshold, that.lowerThreshold) &&
                Objects.equals(upperThreshold, that.upperThreshold);
    }
}
