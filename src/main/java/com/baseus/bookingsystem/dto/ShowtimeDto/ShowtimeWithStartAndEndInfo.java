package com.baseus.bookingsystem.dto.ShowtimeDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShowtimeWithStartAndEndInfo {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
