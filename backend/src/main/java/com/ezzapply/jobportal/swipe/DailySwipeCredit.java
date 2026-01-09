package com.ezzapply.jobportal.swipe;

import com.ezzapply.jobportal.common.BaseEntity;
import com.ezzapply.jobportal.user.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "daily_swipe_credits",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "credit_date"}))
public class DailySwipeCredit extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "credit_date", nullable = false)
    private LocalDate creditDate;

    @Column(nullable = false)
    private int remainingCredits;

    // ---------- getters & setters ----------

    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDate getCreditDate() { return creditDate; }
    public void setCreditDate(LocalDate creditDate) {
        this.creditDate = creditDate;
    }

    public int getRemainingCredits() { return remainingCredits; }
    public void setRemainingCredits(int remainingCredits) {
        this.remainingCredits = remainingCredits;
    }
}
