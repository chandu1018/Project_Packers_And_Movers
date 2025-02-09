package com.packersandmovers.pojos;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "SHIFTING_TYPE")
@NoArgsConstructor
@Getter
@Setter
public class ShiftingType extends BaseEntity {

    @Column(name = "ShiftingTypeName", unique = true, nullable = false, length = 255)
    private String shiftingTypeName;

    @Column(name = "ShiftingTypeDesc", nullable = false, length = 150)
    private String shiftingTypeDesc;

   
}
