package com.packersandmovers.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "serivce_requests") // to specify name of the table
@NoArgsConstructor
@Getter
public class ServiceRequest extends BaseEntity
{
    
}
