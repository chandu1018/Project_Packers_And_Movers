package com.packersandmovers.service;

import java.util.List;
import java.util.Optional;

import com.packersandmovers.dto.ShiftingTypeDTO;
import com.packersandmovers.pojos.ShiftingType;

public interface ShiftingTypeService {

	 public ShiftingType addShiftingType(ShiftingTypeDTO shiftingTypeDTO);
	 public List<ShiftingType> getAllShiftingTypes();
	 public Optional<ShiftingType> getShiftingTypeByName(String name);
}
