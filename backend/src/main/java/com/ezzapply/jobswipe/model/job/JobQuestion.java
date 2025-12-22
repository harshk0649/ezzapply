package com.ezzapply.jobswipe.model.job;

import jakarta.persistence.*;

@Entity
@Table(name = "job_questions")
public class JobQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String type; // TEXT, MCQ

    @Column(columnDefinition = "TEXT")
    private String options; // JSON string for MCQ options

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    // getters & setters
}
