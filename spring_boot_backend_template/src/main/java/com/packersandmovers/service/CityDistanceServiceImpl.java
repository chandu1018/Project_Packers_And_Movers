package com.packersandmovers.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.packersandmovers.dao.CityDistanceDao;
import com.packersandmovers.pojos.CityDistance;

@Service
@Transactional
public class CityDistanceServiceImpl implements CityDistanceService {

    @Autowired
    private CityDistanceDao cityDistanceDao;

    public Long getDistance(String fromCity, String toCity) {
        if (fromCity.compareTo(toCity) > 0) {
            String temp = fromCity;
            fromCity = toCity;
            toCity = temp;
        }

        Optional<CityDistance> existingDistance = cityDistanceDao.findByFromCityAndToCity(fromCity, toCity);
        if (existingDistance.isPresent()) {
            return existingDistance.get().getDistanceKm();
        }

        return null;
    }

    public CityDistance saveDistance(String fromCity, String toCity, Long distanceKm) {
        if (fromCity.compareTo(toCity) > 0) {
            String temp = fromCity;
            fromCity = toCity;
            toCity = temp;
        }

        Optional<CityDistance> existingDistance = cityDistanceDao.findByFromCityAndToCity(fromCity, toCity);
        if (existingDistance.isEmpty()) {
            CityDistance newDistance = new CityDistance();
            newDistance.setFromCity(fromCity);
            newDistance.setToCity(toCity);
            newDistance.setDistanceKm(distanceKm);
            return cityDistanceDao.save(newDistance);
        }

        return existingDistance.get();
    }
}
