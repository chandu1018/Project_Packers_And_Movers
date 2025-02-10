package com.packersandmovers.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "services")
@NoArgsConstructor
@Getter
@Setter
public class Services extends BaseEntity {
	@Column(length = 100,nullable = false)
	private String serviceName;
	
	@Column(length = 200, nullable = false) // not null constraint
	private String description;
}
