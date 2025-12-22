package com.ezzapply.jobswipe.model.application;
import com.ezzapply.jobswipe.model.job.JobQuestion;
import jakarta.persistence.*;

@Entity
@Table(name = "application_answers")
public class ApplicationAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Application application;

    @ManyToOne
    private JobQuestion question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    // getters & setters
}
