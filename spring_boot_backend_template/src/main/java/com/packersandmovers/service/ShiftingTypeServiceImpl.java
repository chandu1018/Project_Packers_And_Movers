package com.packersandmovers.service;


import com.packersandmovers.dao.ShiftingTypeDao;
import com.packersandmovers.dto.ShiftingTypeDTO;
import com.packersandmovers.pojos.ShiftingType;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShiftingTypeServiceImpl implements ShiftingTypeService {

    @Autowired
    private ShiftingTypeDao shiftingTypeRepository;

    public ShiftingType addShiftingType(ShiftingTypeDTO shiftingTypeDTO) {
        ShiftingType shiftingType = new ShiftingType();
        shiftingType.setShiftingTypeName(shiftingTypeDTO.getShiftingTypeName());
        shiftingType.setShiftingTypeDesc(shiftingTypeDTO.getShiftingTypeDesc());
        return shiftingTypeRepository.save(shiftingType);
    }

    public List<ShiftingType> getAllShiftingTypes() {
        return shiftingTypeRepository.findAll();
    }
  
    public Optional<ShiftingType> getShiftingTypeByName(String name) {
        return shiftingTypeRepository.findByShiftingTypeName(name);
    }

   
}

