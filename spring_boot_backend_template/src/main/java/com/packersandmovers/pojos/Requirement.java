package com.packersandmovers.pojos;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requirements") 
@NoArgsConstructor
@Getter
@Setter
public class Requirement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_request_id", nullable = false)
    private ServiceRequest serviceRequest;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Services service;
}