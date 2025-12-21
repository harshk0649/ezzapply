package com.ezzapply.jobswipe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jobs")
public class Job {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    private String description;
    
    private String company;
    
    private String location;
    
    private Double salary;
    
    private String requirements;
    
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private User recruiter;
}
