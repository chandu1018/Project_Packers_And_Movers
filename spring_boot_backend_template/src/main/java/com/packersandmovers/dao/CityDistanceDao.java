package com.packersandmovers.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.pojos.CityDistance;

public interface CityDistanceDao extends JpaRepository<CityDistance, Long> {

    Optional<CityDistance> findByFromCityAndToCity(String fromCity, String toCity);
}
