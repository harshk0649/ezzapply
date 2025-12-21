package com.ezzapply.jobswipe.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class CreditService {

    private static final int DAILY_LIMIT = 20;

    public boolean hasCredits(long usedToday) {
        return usedToday < DAILY_LIMIT;
    }

    public LocalDateTime startOfToday() {
        return LocalDate.now().atStartOfDay();
    }

    public LocalDateTime endOfToday() {
        return LocalDate.now().atTime(23, 59, 59);
    }
}
