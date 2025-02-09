package com.packersandmovers.service;

import com.packersandmovers.pojos.CityDistance;

public interface CityDistanceService {
	public Long getDistance(String fromCity, String toCity);
	 public CityDistance saveDistance(String fromCity, String toCity, Long distanceKm);
}
