package com.packersandmovers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.packersandmovers.pojos.CityDistance;
import com.packersandmovers.service.CityDistanceService;

@RestController
@RequestMapping("/city-distance")
@CrossOrigin(origins = "*")

public class CityDistanceController {

  @Autowired
  CityDistanceService cityDistanceService;

    @GetMapping("/getDistance")
    public ResponseEntity<Long> getCityDistance(@RequestParam String fromCity, @RequestParam String toCity) {
        Long cityDistance = cityDistanceService.getDistance(fromCity, toCity);
        if (cityDistance != null) {
            return ResponseEntity.ok(cityDistance);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/saveDistance")
    public ResponseEntity<CityDistance> saveCityDistance(@RequestParam String fromCity, 
                                                         @RequestParam String toCity, 
                                                         @RequestParam Long distanceKm) {
        CityDistance cityDistance = cityDistanceService.saveDistance(fromCity, toCity, distanceKm);
        return ResponseEntity.status(HttpStatus.CREATED).body(cityDistance);
    }
}

