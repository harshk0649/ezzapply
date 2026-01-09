package com.ezzapply.jobportal.swipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailySwipeCreditRepository
        extends JpaRepository<DailySwipeCredit, Long> {

    Optional<DailySwipeCredit> findByUserIdAndCreditDate(
            Long userId, LocalDate creditDate);
}
