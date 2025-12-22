package com.ezzapply.jobswipe.model.swipe;

import com.ezzapply.jobswipe.model.job.Job;
import com.ezzapply.jobswipe.model.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "swipes",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "job_id"})
    }
)
public class Swipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SwipeDirection direction;

    @Column(nullable = false)
    private LocalDateTime swipedAt = LocalDateTime.now();

    public Swipe() {}

    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public SwipeDirection getDirection() { return direction; }
    public void setDirection(SwipeDirection direction) { this.direction = direction; }

    public LocalDateTime getSwipedAt() { return swipedAt; }
}
